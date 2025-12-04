import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

const defaultVideos = {
  voice: {
    mobile: '/media/video/mobile/voice_mob.mp4',
    desktop: '/media/video/desktop/voice_desk_full_size.mp4',
  },
  insights: {
    mobile: '/media/video/mobile/insights_mob.mp4',
    desktop: '/media/video/desktop/insights_desk_full_size.mp4',
  },
};

const VideoPlayer = ({ videos = defaultVideos }) => {
  const router = useRouter(); // Initialize useRouter
  const basePath = router.basePath;
  const videoContainerRef = useRef(null);
  const voiceMobileRef = useRef(null);
  const voiceDesktopRef = useRef(null);
  const insightsMobileRef = useRef(null);
  const insightsDesktopRef = useRef(null);
  const playPauseBtnRef = useRef(null);
  const btnVoiceRef = useRef(null);
  const btnInsightsRef = useRef(null);

  const textVideo1Ref = useRef(null);
  const textVideo2Ref = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTheme, setActiveTheme] = useState('voice'); // 'voice' or 'insights'
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
    setIsTransitioning(true);
    // The rest of the logic will be handled by useEffect based on activeTheme change
    setTimeout(() => {
        setActiveTheme(newTheme);
        setIsTransitioning(false);
    }, 500); // Should match animation duration
  };

  const handlePlayPause = () => {
    const videoToPlay = activeTheme === 'voice'
      ? (isMobileView ? voiceMobileRef.current : voiceDesktopRef.current)
      : (isMobileView ? insightsMobileRef.current : insightsDesktopRef.current);
      
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

  useEffect(() => {
    const allVideos = [voiceMobileRef.current, voiceDesktopRef.current, insightsMobileRef.current, insightsDesktopRef.current];
    allVideos.forEach(video => {
        if(video) {
            video.addEventListener('play', () => setIsPlaying(true));
            video.addEventListener('pause', () => setIsPlaying(false));
        }
    });

    return () => {
        allVideos.forEach(video => {
            if(video) {
                video.removeEventListener('play', () => setIsPlaying(true));
                video.removeEventListener('pause', () => setIsPlaying(false));
            }
        });
    }
  }, []);

  return (
    <>
      <section id="video" className="container-offset">
        <div className="container">
          <div className="card card--video-no-hover">
            <div className={`video-player-container ${isPlaying ? 'is-playing' : ''}`} ref={videoContainerRef}>
              <video 
                id="voiceMobile" 
                preload="metadata" muted playsInline 
                className={`animate__animated ${activeTheme === 'voice' && isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                src={basePath + videos.voice.mobile} ref={voiceMobileRef}
              ></video>
              <video 
                id="voiceDesktop" 
                preload="metadata" muted playsInline 
                className={`animate__animated ${activeTheme === 'voice' && !isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                src={basePath + videos.voice.desktop} ref={voiceDesktopRef}
              ></video>
              <video 
                id="insightsMobile" 
                preload="metadata" muted playsInline 
                className={`animate__animated ${activeTheme === 'insights' && isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                src={basePath + videos.insights.mobile} ref={insightsMobileRef}
              ></video>
              <video 
                id="insightsDesktop" 
                preload="metadata" muted playsInline 
                className={`animate__animated ${activeTheme === 'insights' && !isMobileView ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`}
                src={basePath + videos.insights.desktop} ref={insightsDesktopRef}
              ></video>

              <button id="playPauseBtn" className="video-play-button" onClick={handlePlayPause} ref={playPauseBtnRef}>
                <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="video-controlli" className="text-center">
        <div className="container">
          <div className="video-controls-bar">
            <button id="btn-voice" className={`video-controls-bar__button ${activeTheme === 'voice' ? 'video-controls-bar__button--active' : ''}`} onClick={() => handleThemeChange('voice')} ref={btnVoiceRef}>VOICE</button>
            <button id="btn-insights" className={`video-controls-bar__button ${activeTheme === 'insights' ? 'video-controls-bar__button--active' : ''}`} onClick={() => handleThemeChange('insights')} ref={btnInsightsRef}>INSIGHTS</button>
          </div>
          <p id="text-video-1" className={`animate__animated color-text-gold-light mt-3 mb-0 custom-text ${activeTheme === 'voice' ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`} ref={textVideo1Ref}>Automatizza la raccolta di informazioni usando la voce degli utenti</p>
          <p id="text-video-2" className={`animate__animated color-text-gold-light mt-3 mb-0 custom-text ${activeTheme === 'insights' ? 'animate__fadeIn' : 'animate__fadeOut video--hidden'}`} ref={textVideo2Ref}>Trasforma l'audio in informazioni strategiche strutturate da sincronizzare in azienda</p>
        </div>
      </section>
    </>
  );
};

export default VideoPlayer;