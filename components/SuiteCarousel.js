import React, { useEffect, useRef } from 'react';

const SuiteCarousel = () => {
  const marqueeContentRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const marqueeContent = marqueeContentRef.current;

    if (!marqueeContent) return;

    // Duplicate the content for a seamless loop
    const originalContent = marqueeContent.innerHTML;
    // Clear the existing content before adding duplicated content to prevent multiple duplications on re-renders
    marqueeContent.innerHTML = originalContent + originalContent;

    let currentScroll = 0;
    const scrollSpeed = 0.5; // Adjust for desired speed

    const animateMarquee = () => {
      // Calculate the width of a single set of items (original content)
      // This assumes original content is roughly half of the duplicated content's scrollWidth
      const singleContentWidth = marqueeContent.scrollWidth / 2;

      currentScroll += scrollSpeed;

      if (currentScroll >= singleContentWidth) {
        currentScroll = 0; // Reset to start for a seamless loop
      }

      marqueeContent.style.transform = `translateX(-${currentScroll}px)`;

      animationFrameId.current = requestAnimationFrame(animateMarquee);
    };

    // Start animation
    animateMarquee();

    const parentElement = marqueeContent.parentElement;
    if (parentElement) {
      parentElement.addEventListener('mouseenter', () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      });

      parentElement.addEventListener('mouseleave', () => {
        animateMarquee();
      });
    }


    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (parentElement) {
        parentElement.removeEventListener('mouseenter', () => {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
        });

        parentElement.removeEventListener('mouseleave', () => {
          animateMarquee();
        });
      }
    };
  }, []);

  return (
    <section id="suite-marquee" className="section-padding-bottom">
      <div className="marquee">
        <div className="marquee__content" ref={marqueeContentRef}>
          <div className="marquee__item">
            <i className="bi bi-mic-fill"></i>
            <span>Voice to Insights</span>
          </div>
          <div className="marquee__item">
            <i className="bi bi-whatsapp"></i>
            <span>WAQ</span>
          </div>
          <div className="marquee__item">
            <i className="bi bi-currency-euro"></i>
            <span>SmartPricing</span>
          </div>
          <div className="marquee__item">
            <i className="bi bi-person-check-fill"></i>
            <span>StayOn</span>
          </div>
          <div className="marquee__item">
            <i className="bi bi-chat-heart-fill"></i>
            <span>Sentiment</span>
          </div>
          <div className="marquee__item">
            <i className="bi bi-cloud-download"></i>
            <span>Sales Predict</span>
          </div>
          <div className="marquee__item">
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
