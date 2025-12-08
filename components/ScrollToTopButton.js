import React, { useState, useEffect } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollPosition]);

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
