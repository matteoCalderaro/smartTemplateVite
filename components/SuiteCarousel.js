import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MOCK_APPS, ICONS } from '../data/applications-home-page';

const SuiteCarousel = () => {
  const router = useRouter();
  const carouselContentRef = useRef(null);
  const carouselAnimationId = useRef(null);

  const handleItemClick = (appPath) => {
    // Stop the carousel animation immediately
    if (carouselAnimationId.current) {
      cancelAnimationFrame(carouselAnimationId.current);
    }
    // Navigate to the app's page
    router.push(`/${appPath}`);
  };

  useEffect(() => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

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

    const parentElement = carouselContent.parentElement;
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
          {MOCK_APPS.map((app) => {
            const IconComponent = ICONS[app.iconName]; // Get the icon component from ICONS object
            return (
              <div
                key={app.id}
                className="carousel__item"
                onClick={() => handleItemClick(app.path)}
              >
                {IconComponent && <IconComponent />} {/* Render the icon component if it exists */}
                <span>{app.name}</span>
              </div>
            );
          })}
          {MOCK_APPS.map((app) => {
            const IconComponent = ICONS[app.iconName];
            return (
              <div
                key={`${app.id}-clone`} // Use a different key for the cloned items
                className="carousel__item"
                onClick={() => handleItemClick(app.path)}
              >
                {IconComponent && <IconComponent />}
                <span>{app.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuiteCarousel;
