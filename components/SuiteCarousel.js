import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MOCK_APPS, ICONS } from '../data/applications-home-page';

const SuiteCarousel = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const carouselContentRef = useRef(null);
  const carouselAnimationId = useRef(null);
  
  // Ref to store the precise reset position for a seamless loop
  const resetPositionRef = useRef(0);

  // Refs for drag-to-scroll and state tracking
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const isMouseOverRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const currentScrollRef = useRef(0);
  const hoverTimeoutRef = useRef(null); // Ref for hover intent timeout
  
  const scrollSpeed = 0.7;

  const animateCarousel = () => {
    const carouselContent = carouselContentRef.current;
    if (!carouselContent || isDraggingRef.current || isMouseOverRef.current) {
      carouselAnimationId.current = requestAnimationFrame(animateCarousel);
      return;
    }
    
    // Only animate if we have a valid reset position
    if (resetPositionRef.current > 0) {
      currentScrollRef.current += scrollSpeed;
      // When the scroll position exceeds the reset point, subtract the reset amount
      // This creates a seamless loop even if we overshoot between frames.
      if (currentScrollRef.current >= resetPositionRef.current) {
        currentScrollRef.current -= resetPositionRef.current;
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

    // --- Measurement and Animation Start ---
    const measureAndStartAnimation = () => {
      // Ensure we have the cloned elements rendered
      if (carouselContent.children.length > MOCK_APPS.length) {
        const resetElement = carouselContent.children[MOCK_APPS.length];
        if (resetElement) {
          // Store the precise pixel offset of the first cloned element
          resetPositionRef.current = resetElement.offsetLeft;
        }
      }
      // Start the animation loop
      animateCarousel();
    };
    
    // Use a timeout to ensure the DOM is fully painted and stable before measuring
    const initTimer = setTimeout(measureAndStartAnimation, 100);

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
      
      let newScroll = scrollStartRef.current - walk;

      // Use the same precise reset logic for dragging
      if (resetPositionRef.current > 0) {
        if (newScroll >= resetPositionRef.current) {
          newScroll -= resetPositionRef.current;
          scrollStartRef.current -= resetPositionRef.current;
        } else if (newScroll < 0) {
          newScroll += resetPositionRef.current;
          scrollStartRef.current += resetPositionRef.current;
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

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (!isMouseOverRef.current) {
        animateCarousel();
      }
    };
    

    // --- Specific Event Handlers ---
    const handleMouseDown = (e) => { e.preventDefault(); dragStart(e.pageX); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); };
    const handleMouseMove = (e) => { e.preventDefault(); dragMove(e.pageX); };
    const handleMouseUp = dragEnd;
    const handleTouchStart = (e) => { dragStart(e.touches[0].pageX); window.addEventListener('touchmove', handleTouchMove, { passive: false }); window.addEventListener('touchend', handleTouchEnd); };
    const handleTouchMove = (e) => { e.preventDefault(); dragMove(e.touches[0].pageX); };
    const handleTouchEnd = dragEnd;

    // --- Hover Handlers with Intent Logic ---
    const handleMouseEnter = () => { 
      // Clear any pending timeout to avoid multiple stop commands
      clearTimeout(hoverTimeoutRef.current);
      // Set a new timeout.
      hoverTimeoutRef.current = setTimeout(() => {
        // ONLY set the mouse over flag and stop the animation if the timeout completes.
        isMouseOverRef.current = true; 
        stopAnimation();
      }, 300); // 300ms delay
    };
    const handleMouseLeave = () => { 
      // Clear the timeout, preventing the animation from stopping if the hover was brief.
      clearTimeout(hoverTimeoutRef.current);
      isMouseOverRef.current = false; 

      // ONLY restart the animation if it was truly stopped (its ID is null) 
      // and we are not in the middle of a drag.
      // If the animation was just "idling" due to isMouseOverRef, it will resume on its own.
      if (carouselAnimationId.current === null && !isDraggingRef.current) {
        animateCarousel(); 
      }
    };

    // Attach listeners
    sectionElement.addEventListener('mousedown', handleMouseDown);
    sectionElement.addEventListener('touchstart', handleTouchStart);
    sectionElement.addEventListener('mouseenter', handleMouseEnter);
    sectionElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(initTimer);
      clearTimeout(hoverTimeoutRef.current); // Also clear hover timeout on unmount
      stopAnimation();
      sectionElement.removeEventListener('mousedown', handleMouseDown);
      sectionElement.removeEventListener('touchstart', handleTouchStart);
      sectionElement.removeEventListener('mouseenter', handleMouseEnter);
      sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
    <div id='suite-title' className="fs-5 mt-5 pt-4 mt-md-0 text-center">
      <span className="color-text-gold-light custom-text">Scopri la suite BiSmart</span>
    </div>
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
    </>
  );
};

export default SuiteCarousel;