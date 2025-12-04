import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Assuming 'voiceToInsights' is the trigger element, as per original JS
      const triggerElement = document.querySelector('#strengths');
      if (triggerElement) {
        const triggerElementRect = triggerElement.getBoundingClientRect();
        if (triggerElementRect.top < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback or default visibility logic if triggerElement is not found
        if (window.scrollY > 300) { // Example fallback: show after scrolling 300px
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id="scrollToTopBtn"
      className={`scroll-to-top-button ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
