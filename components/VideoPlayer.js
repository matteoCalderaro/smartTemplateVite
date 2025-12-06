import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router'; // Import useRouter


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
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to track client mount

  useEffect(() => {
    setIsClient(true);
  }, []); // Empty dependency array means it runs once after initial render on client

  const playButtonRef = useRef(null);

  const isMobile = useCallback(() => window.innerWidth < 576, []);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  useEffect(() => {
    const handleResize = () => {
        setIsMobileView(isMobile());
    };
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedHandleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [isMobile]);

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
          const newRight = 47 + overflowAmount;
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

  const handleThemeChange = (newTheme) => {
    if (activeTheme === newTheme || isTransitioning) return;

    const currentThemeVideos = videoRefs.current[activeTheme];
    if (currentThemeVideos && currentThemeVideos.element) {
      currentThemeVideos.element.pause();
    }

    setIsTransitioning(true);
    setPreviousTheme(activeTheme);
    setActiveTheme(newTheme);

    setTimeout(() => {
      setPreviousTheme(null);
      setIsPlaying(false);
      setIsTransitioning(false);
    }, 500); // Should match animation duration
  };

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



  // New useEffect to reset currentTime for the active video
  useEffect(() => {
    const currentThemeVideos = videoRefs.current[activeTheme];
    if (currentThemeVideos) {
      const videoToReset = currentThemeVideos.element;
      if (videoToReset) {
        videoToReset.currentTime = 0;
      }
    }
  }, [activeTheme, isMobileView]);

  return (
    <>
      <section id="video" className="container-offset">
        <div className="container">
          <div className="card card--video-no-hover">
            <div className={`video-player-container ${isPlaying ? 'is-playing' : ''}`} ref={videoContainerRef}>
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
            </div>
          </div>
        </div>
      </section>

      {/* La sezione #video-controlli verrà renderizzata solo se ci sono più di un tema */}
        <section id="video-controlli" className="text-center">
          <div className="container" style={{ visibility: themeNames.length > 1 ? 'visible' : 'hidden' }}  >
            <div className="video-controls-bar">
              {themeNames.map((themeName) => (
                <button 
                  key={themeName}
                  id={`btn-${themeName}`} 
                  className={`video-controls-bar__button ${activeTheme === themeName ? 'video-controls-bar__button--active' : ''}`} 
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
                className={`animate__animated color-text-gold-light mt-3 mb-0 custom-text ${activeTheme === themeName ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
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