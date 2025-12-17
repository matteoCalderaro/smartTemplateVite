import React, { useEffect, useRef } from 'react';

const SuiteCarousel = () => {
  const carouselContentRef = useRef(null);
  const carouselAnimationId = useRef(null);

  useEffect(() => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    // Duplicate the content for a seamless loop
    const originalContent = carouselContent.innerHTML;
    // Clear the existing content before adding duplicated content to prevent multiple duplications on re-renders
    carouselContent.innerHTML = originalContent + originalContent;

    let currentScroll = 0;
    const scrollSpeed = 0.5; // Adjust for desired speed

    const animateCarousel = () => {
      // Calculate the width of a single set of items (original content)
      // This assumes original content is roughly half of the duplicated content's scrollWidth
      const singleContentWidth = carouselContent.scrollWidth / 2;

      currentScroll += scrollSpeed;

      if (currentScroll >= singleContentWidth) {
        currentScroll = 0; // Reset to start for a seamless loop
      }

      carouselContent.style.transform = `translateX(-${currentScroll}px)`;

      carouselAnimationId.current = requestAnimationFrame(animateCarousel);
    };

    // Start animation
    animateCarousel();

    const parentElement = marqueeContent.parentElement;
    if (parentElement) {
      parentElement.addEventListener('mouseenter', () => {
        if (carouselAnimationId.current) {
          cancelAnimationFrame(carouselAnimationId.current);
        }
      });

      parentElement.addEventListener('mouseleave', () => {
        animateCarousel();
      });
    }


    return () => {
      if (carouselAnimationId.current) {
        cancelAnimationFrame(carouselAnimationId.current);
      }
      if (parentElement) {
        parentElement.removeEventListener('mouseenter', () => {
          if (carouselAnimationId.current) {
            cancelAnimationFrame(carouselAnimationId.current);
          }
        });

        parentElement.removeEventListener('mouseleave', () => {
          animateCarousel();
        });
      }
    };
  }, []);

  return (
    <section id="suite-carousel">
      <div className="carousel">
        <div className="carousel__content" ref={carouselContentRef}>
          <div className="carousel__item">
            <i className="bi bi-mic-fill"></i>
            <span>Voice to Insights</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-whatsapp"></i>
            <span>WAQ</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-currency-euro"></i>
            <span>SmartPricing</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-person-check-fill"></i>
            <span>StayOn</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-chat-heart-fill"></i>
            <span>Sentiment</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-cloud-download"></i>
            <span>Sales Predict</span>
          </div>
          <div className="carousel__item">
            <i className="bi bi-broadcast"></i>
            <span>WAP</span>
          </div>
          {/* Content will be duplicated by JavaScript for seamless loop */}
        </div>
      </div>
    </section>
  );
};

export default SuiteCarousel;
