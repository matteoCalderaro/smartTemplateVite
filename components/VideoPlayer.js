import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import useMediaQuery from '../hooks/useMediaQuery'; // Importa il nuovo hook useMediaQuery


const VideoPlayer = ({ videos }) => {
  const router = useRouter();
  const basePath = router.basePath;
  const videoContainerRef = useRef(null);
  const videoRefs = useRef({}); // New: Manages all video refs dynamically

  // Dynamically get theme names from the videos prop
  const themeNames = Object.keys(videos);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themeNames[0]); // Initialize with the first theme
  const [previousTheme, setPreviousTheme] = useState(null);
  // Usa il nuovo hook useMediaQuery per determinare la vista mobile
  const isMobileView = useMediaQuery(576); // Breakpoint per mobile (es. meno di 576px)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to track client mount
  
  // --- Progress Bar State ---
  // `progress`: tiene traccia del tempo di riproduzione corrente in secondi.
  const [progress, setProgress] = useState(0);
  // `duration`: memorizza la durata totale del video in secondi.
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    setIsClient(true);
  }, []); // Empty dependency array means it runs once after initial render on client

  const playButtonRef = useRef(null);

  // Rimossa la funzione isMobile e la funzione debounce in quanto encapsulate in useMediaQuery

  // Rimosso l'useEffect per handleResize, ora gestito in useMediaQuery

  // Effect to dynamically reposition the play button on mobile to keep it in the viewport
  useEffect(() => {
    const playButton = playButtonRef.current;
    const videoContainer = videoContainerRef.current;

    const repositionButton = () => {
      if (!playButton || !videoContainer) return;

      // On desktop, or if not overflowing, clear inline style to let CSS take over.
      if (!isMobileView) {
        playButton.style.right = '';
        return;
      }
      
      // On mobile, calculate dynamic 'right'
      const containerRect = videoContainer.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // If the container's right edge is off-screen
      if (containerRect.right > viewportWidth) {
          const overflowAmount = containerRect.right - viewportWidth;
          // The new 'right' is the base distance (47px from CSS) minus the overflow amount.
          const newRight = 40 + overflowAmount;
          playButton.style.right = `${newRight}px`;
      } else {
          // If not overflowing, ensure the default CSS rule applies by clearing the inline style.
          playButton.style.right = '';
      }
    };

    const throttledReposition = () => window.requestAnimationFrame(repositionButton);

    window.addEventListener('scroll', throttledReposition, { passive: true });
    window.addEventListener('resize', throttledReposition);

    repositionButton(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledReposition);
      window.removeEventListener('resize', throttledReposition);
    };
  }, [isMobileView]); // Run this effect whenever isMobileView changes

  const transitionTimeoutRef = useRef(null); // Per gestire i timeout delle transizioni video

  const handleThemeChange = (newTheme) => {
    if (activeTheme === newTheme) return; // Non fare nulla se si clicca sullo stesso tema

    // Cancella qualsiasi timeout di transizione precedente in corso
    if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
    }

    // Metti in pausa il video attualmente in riproduzione prima di cambiare tema
    const currentlyPlayingVideo = videoRefs.current[activeTheme]?.element;
    if (currentlyPlayingVideo) {
      currentlyPlayingVideo.pause();
    }

    setIsTransitioning(true); // Inizia la transizione del video
    setPreviousTheme(activeTheme);
    setActiveTheme(newTheme); // Aggiorna immediatamente il tema attivo

    // Pianifica il reset dello stato di transizione dopo la durata dell'animazione
    transitionTimeoutRef.current = setTimeout(() => {
        setPreviousTheme(null);
        setIsPlaying(false); // Resetta lo stato di riproduzione
        setIsTransitioning(false); // Termina la transizione del video
        transitionTimeoutRef.current = null;
    }, 500); // Corrisponde alla durata dell'animazione CSS
  };

  // Pulisce il timeout alla smontaggio del componente per evitare memory leak
  useEffect(() => {
      return () => {
          if (transitionTimeoutRef.current) {
              clearTimeout(transitionTimeoutRef.current);
          }
      };
  }, []); // Esegui solo al mount/unmount

  const handlePlayPause = () => {
    const currentThemeVideos = videoRefs.current[activeTheme];
    if (!currentThemeVideos) return;

    const videoToPlay = currentThemeVideos.element;
      
    if (videoToPlay) {
      if (videoToPlay.paused) {
        videoToPlay.play();
        setIsPlaying(true);
      } else {
        videoToPlay.pause();
        setIsPlaying(false);
      }
    }
  };

  // --- Progress Bar Logic ---
  // Gestisce il click sulla barra di avanzamento per navigare nel video (seek).
  const handleProgressChange = (e) => {
    const video = videoRefs.current[activeTheme]?.element;
    if (!video || !duration) return;
  
    // `currentTarget` si riferisce all'elemento su cui è montato l'event listener (il contenitore della barra).
    const rect = e.currentTarget.getBoundingClientRect();
    // Calcola la posizione del clic relativa all'inizio della barra.
    const x = e.clientX - rect.left;
    const width = rect.width;
    // Converte la posizione del clic in un nuovo tempo del video.
    const newTime = (x / width) * duration;
  
    video.currentTime = newTime;
    setProgress(newTime);
  };


  // Resetta il tempo e la barra di avanzamento quando cambia il video attivo.
  useEffect(() => {
    const currentThemeVideos = videoRefs.current[activeTheme];
    if (currentThemeVideos) {
      const videoToReset = currentThemeVideos.element;
      if (videoToReset) {
        videoToReset.currentTime = 0;
        setProgress(0); // Resetta lo stato del progresso.
        setDuration(0); // Resetta la durata.
      }
    }
  }, [activeTheme, isMobileView]);

  // Sincronizza lo stato del video con la UI (barra di avanzamento e pulsanti).
  useEffect(() => {
    const currentVideo = videoRefs.current[activeTheme]?.element;

    // Quando il video finisce, riavvolgilo e imposta lo stato su "pausa".
    const handleVideoEnd = () => {
      if (currentVideo) currentVideo.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    };

    // Aggiorna lo stato `progress` man mano che il video avanza.
    const handleTimeUpdate = () => {
      if (currentVideo) setProgress(currentVideo.currentTime);
    };

    // Imposta la durata totale del video quando i metadati sono caricati.
    const handleLoadedMetadata = () => {
      if (currentVideo) setDuration(currentVideo.duration);
    };


    if (currentVideo) {
      currentVideo.addEventListener('ended', handleVideoEnd);
      currentVideo.addEventListener('timeupdate', handleTimeUpdate);
      currentVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Funzione di pulizia per rimuovere gli event listener ed evitare memory leak.
    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('ended', handleVideoEnd);
        currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
        currentVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [activeTheme, isMobileView, isClient]);

  return (
    <>
      <section id="video" className="video-container-offset">
        <div className="container">
          <div className="video-card">
            <div className={`video-card__video-container ${isPlaying ? 'is-playing' : ''}`} ref={videoContainerRef}>
              {isClient && ([activeTheme, previousTheme].filter(Boolean).map((themeName) => {
                const isActive = themeName === activeTheme;

                return (
                  <video
                    key={themeName}
                    id={`${themeName}Video`}
                    preload="metadata"
                    muted
                    playsInline
                    className={`animate__animated ${isActive ? ' animate__fadeIn' : ' animate__fadeOut'}`}
                    src={isMobileView ? (basePath + videos[themeName].mobile) : (basePath + videos[themeName].desktop)}
                    ref={isActive ? (el) => {
                      if (!videoRefs.current[themeName]) videoRefs.current[themeName] = {};
                      videoRefs.current[themeName].element = el; // Store the single element
                    } : null}
                  ></video>
                );
              }))}

              <button ref={playButtonRef} id="playPauseBtn" className="video-play-button" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause video' : 'Play video'} disabled={isTransitioning}>
                <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
              </button>
              
              {/* --- Elemento JSX della Barra di Avanzamento --- */}
              <div className="video-progress-bar__container" onClick={handleProgressChange}>
                <div 
                  className="video-progress-bar__filled" 
                  // La larghezza è una percentuale calcolata dal progresso corrente rispetto alla durata totale.
                  style={{ width: `${(progress / duration) * 100 || 0}%` }}
                ></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* La sezione #video-controlli verrà renderizzata solo se ci sono più di un tema */}
        <section id="video-controls" className="text-center section-padding-bottom-small">
          <div className="container" style={{ visibility: themeNames.length > 1 ? 'visible' : 'hidden' }}  >
            <div className="video__controls-bar">
              {themeNames.map((themeName) => (
                <button 
                  key={themeName}
                  id={`btn-${themeName}`} 
                  className={`video__controls-bar__button ${activeTheme === themeName ? 'video__controls-bar__button--active' : ''}`} 
                  onClick={() => handleThemeChange(themeName)}
                >
                  {themeName.toUpperCase()}
                </button>
              ))}
            </div>
            {themeNames.map((themeName) => (
              <p 
                key={`text-video-${themeName}`}
                id={`text-video-${themeName}`} 
                className={`animate__animated color-text-gold-light mt-3 mb-0 custom-text ${activeTheme === themeName ? 'animate__fadeIn' : 'animate__fadeOut d-none'}`}
              >
                {videos[themeName].text}
              </p>
            ))}
          </div>
        </section>
    </>
  );
};

export default VideoPlayer;