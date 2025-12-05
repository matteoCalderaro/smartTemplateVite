import React, { useEffect, useRef } from 'react';

const FADE_SPEED = 1.5;
const MAX_MOVE_AMOUNT = 300;

const HeroSection = ({ content }) => {
  const heroRef = useRef(null);
  const heroSideImageLeftRef = useRef(null);
  const heroSideImageRightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;

        let opacity = 1 - (scrollPosition / (heroHeight / FADE_SPEED));

        if (opacity < 0) opacity = 0;
        if (opacity > 1) opacity = 1;

        heroRef.current.style.opacity = opacity;

        if (heroSideImageLeftRef.current && heroSideImageRightRef.current) {
          let moveAmount = Math.min(scrollPosition, heroHeight) / (heroHeight / MAX_MOVE_AMOUNT);
          heroSideImageLeftRef.current.style.transform = `translateX(${-moveAmount}px)`;
          heroSideImageRightRef.current.style.transform = `translateX(${moveAmount}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="hero" className="text-center" ref={heroRef}>
      <div className="container">
        <div className={`hero-side-image hero-side-image--left ${!content.isHome ? 'd-none' : ''}`} ref={heroSideImageLeftRef}>
          <div className="hero-animated-wrapper">
            <div className="hero-cloud hero-cloud--sx">
              <div className="cloud-background"></div>
            </div>
          </div>
        </div>
        <div className={`hero-side-image hero-side-image--right ${!content.isHome ? 'd-none' : ''}`} ref={heroSideImageRightRef}>
          <div className="hero-animated-wrapper">
            <div className="hero-cloud hero-cloud--dx">
              <div className="cloud-background"></div>
            </div>
          </div>
        </div>
        <div className="copy-container">
          <div className="brand d-flex align-items-center justify-content-center gap-4 color-text-gold-light">
            <i className={`bi ${content.icon}`}></i>
            <span className="brand__text">{content.brand}</span>
          </div>
          <div className="payhoff text-shadow-effect text-white">{content.payhoff}</div>
          <div className="decription color-text-gold-light">
            {content.descriptions.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <div className="button d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <a href="#form" className="hero-button fw-semibold rounded-4" data-scroll-to>
              <span className="hero-button__content">{content.buttonText}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;