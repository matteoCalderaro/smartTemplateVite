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
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const handleThemeChange = (newTheme) => {
    if (activeTheme === newTheme || isTransitioning) return;

    // Pause and reset ALL videos
    Object.values(videoRefs.current).forEach(themeVideos => {
      if (themeVideos.mobile) {
        themeVideos.mobile.pause();
      }
      if (themeVideos.desktop) {
        themeVideos.desktop.pause();
      }
    });

    // Set isPlaying to false, as all videos are now paused
    setIsTransitioning(true);
    // The rest of the logic will be handled by useEffect based on activeTheme change
    setTimeout(() => {
        setActiveTheme(newTheme);
        setIsPlaying(false); // Change state AFTER transition
        setIsTransitioning(false);
    }, 500); // Should match animation duration
  };

  const handlePlayPause = () => {
    const currentThemeVideos = videoRefs.current[activeTheme];
    if (!currentThemeVideos) return;

    const videoToPlay = isMobileView ? currentThemeVideos.mobile : currentThemeVideos.desktop;
      
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
      const videoToReset = isMobileView ? currentThemeVideos.mobile : currentThemeVideos.desktop;
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
              {themeNames.map((themeName) => (
                <React.Fragment key={themeName}>
                  <video 
                    id={`${themeName}Mobile`} 
                    preload="metadata" muted playsInline 
                    className={`animate__animated ${activeTheme === themeName && isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                    src={basePath + videos[themeName].mobile}
                    ref={(el) => {
                      if (!videoRefs.current[themeName]) videoRefs.current[themeName] = {};
                      videoRefs.current[themeName].mobile = el;
                    }}
                  ></video>
                  <video 
                    id={`${themeName}Desktop`} 
                    preload="metadata" muted playsInline 
                    className={`animate__animated ${activeTheme === themeName && !isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                    src={basePath + videos[themeName].desktop}
                    ref={(el) => {
                      if (!videoRefs.current[themeName]) videoRefs.current[themeName] = {};
                      videoRefs.current[themeName].desktop = el;
                    }}
                  ></video>
                </React.Fragment>
              ))}

              <button id="playPauseBtn" className="video-play-button" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause video' : 'Play video'} disabled={isTransitioning}>
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