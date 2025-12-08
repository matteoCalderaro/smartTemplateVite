import React, { useEffect, useRef } from 'react';
import Image from 'next/image'; // Import Image
import { useRouter } from 'next/router'; // Import useRouter
import useScrollPosition from '../hooks/useScrollPosition';

const FADE_SPEED = 1.5;
const MAX_MOVE_AMOUNT = 300;

const HeroSection = ({ content }) => {
  const heroRef = useRef(null);
  const heroSideImageLeftRef = useRef(null);
  const heroSideImageRightRef = useRef(null);
  const scrollPosition = useScrollPosition();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (heroRef.current) {
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
  }, [scrollPosition]);

  return (
    <header id="hero" className="text-center" ref={heroRef}>
      <div className="container">
        {content.isHome && (
          <div className="flex-grow-1"></div>
        )}
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
            <div className="copy-container__brand d-flex align-items-center justify-content-center gap-4 color-text-gold-light">
              <i className={`bi ${content.icon}`}></i>
              <span className="brand__text">{content.brand}</span>
            </div>
            <div className="copy-container__payoff text-shadow-effect text-white">{content.payoff}</div>
            <div className="copy-container__description color-text-gold-light">
              {content.descriptions.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
              <a href="#form" className="hero-cta-button fw-semibold rounded-4" data-scroll-to>
                <span className="hero-cta-button__content">{content.buttonText}</span>
              </a>
            </div>
          </div>
        {content.isHome && (
          <div className="mouse-scroll-icon flex-grow-1 d-flex align-items-center" onClick={() => {
            window.scrollTo({
              top: window.scrollY + 150, // Scroll down by 150px
              behavior: 'smooth'
            });
          }}>
            <Image
              src={router.basePath + "/media/arrow.png"}
              alt="Scroll Down"
              width={48} // Adjust as needed
              height={48} // Adjust as needed
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeroSection;