import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MOCK_APPS, ICONS } from '../data/applications-home-page';

const SuiteCarousel = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const carouselContentRef = useRef(null);
  const carouselAnimationId = useRef(null);

  // Refs for drag-to-scroll and state tracking
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const isMouseOverRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const currentScrollRef = useRef(0);
  
  const scrollSpeed = 0.5;

  const animateCarousel = () => {
    const carouselContent = carouselContentRef.current;
    if (!carouselContent || isDraggingRef.current || isMouseOverRef.current) return;

    const singleContentWidth = carouselContent.scrollWidth / 2;

    if (singleContentWidth > 0) {
        currentScrollRef.current += scrollSpeed;
        if (currentScrollRef.current >= singleContentWidth) {
            currentScrollRef.current = 0;
        }
        carouselContent.style.transform = `translateX(-${currentScrollRef.current}px)`;
    }
    carouselAnimationId.current = requestAnimationFrame(animateCarousel);
  };

  const stopAnimation = () => {
    if (carouselAnimationId.current) {
      cancelAnimationFrame(carouselAnimationId.current);
      carouselAnimationId.current = null;
    }
  };

  const handleItemClick = (appPath) => {
    if (!hasDraggedRef.current) {
      stopAnimation();
      router.push(`/${appPath}`);
    }
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const carouselContent = carouselContentRef.current;

    if (!sectionElement || !carouselContent) return;

    // --- Generic Handlers ---
    const dragStart = (pageX) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = pageX;
      scrollStartRef.current = currentScrollRef.current;
      stopAnimation();
      sectionElement.style.cursor = 'grabbing';
      sectionElement.style.userSelect = 'none';
    };

    const dragMove = (pageX) => {
      if (!isDraggingRef.current) return;
      const walk = pageX - startXRef.current;
      if (Math.abs(walk) > 10) {
        hasDraggedRef.current = true;
      }
      const singleContentWidth = carouselContent.scrollWidth / 2;
      let newScroll = scrollStartRef.current - walk;
      if (singleContentWidth > 0) {
        if (newScroll >= singleContentWidth) {
          newScroll -= singleContentWidth;
          scrollStartRef.current -= singleContentWidth;
        } else if (newScroll < 0) {
          newScroll += singleContentWidth;
          scrollStartRef.current += singleContentWidth;
        }
      }
      currentScrollRef.current = newScroll;
      carouselContent.style.transform = `translateX(-${currentScrollRef.current}px)`;
    };

    const dragEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      sectionElement.style.cursor = 'grab';
      sectionElement.style.userSelect = 'auto';

      // Clean up global listeners
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (!isMouseOverRef.current) {
        animateCarousel();
      }
    };
    
    // --- Mouse Event Specific Handlers ---
    const handleMouseDown = (e) => {
      e.preventDefault();
      dragStart(e.pageX);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e) => {
      e.preventDefault();
      dragMove(e.pageX);
    };
    const handleMouseUp = dragEnd;

    // --- Touch Event Specific Handlers ---
    const handleTouchStart = (e) => {
      dragStart(e.touches[0].pageX);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      dragMove(e.touches[0].pageX);
    };
    const handleTouchEnd = dragEnd;

    // --- Hover Handlers ---
    const handleMouseEnter = () => {
      isMouseOverRef.current = true;
      stopAnimation();
    };
    const handleMouseLeave = () => {
      isMouseOverRef.current = false;
      if (!isDraggingRef.current) {
        animateCarousel();
      }
    };

    // Attach listeners
    sectionElement.addEventListener('mousedown', handleMouseDown);
    sectionElement.addEventListener('touchstart', handleTouchStart);
    sectionElement.addEventListener('mouseenter', handleMouseEnter);
    sectionElement.addEventListener('mouseleave', handleMouseLeave);
    
    animateCarousel();

    return () => {
      stopAnimation();
      sectionElement.removeEventListener('mousedown', handleMouseDown);
      sectionElement.removeEventListener('touchstart', handleTouchStart);
      sectionElement.removeEventListener('mouseenter', handleMouseEnter);
      sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      // Clean up any stray global listeners
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section 
      id="suite-carousel"
      ref={sectionRef}
      style={{ cursor: 'grab' }}
    >
      <div className="carousel">
        <div 
          className="carousel__content" 
          ref={carouselContentRef}
        >
          {MOCK_APPS.map((app) => {
            const IconComponent = ICONS[app.iconName];
            return (
              <div
                key={app.id}
                className="carousel__item"
                onClick={() => handleItemClick(app.path)}
                onDragStart={(e) => e.preventDefault()}
              >
                {IconComponent && <IconComponent />}
                <span>{app.name}</span>
              </div>
            );
          })}
          {MOCK_APPS.map((app) => {
            const IconComponent = ICONS[app.iconName];
            return (
              <div
                key={`${app.id}-clone`}
                className="carousel__item"
                onClick={() => handleItemClick(app.path)}
                onDragStart={(e) => e.preventDefault()}
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