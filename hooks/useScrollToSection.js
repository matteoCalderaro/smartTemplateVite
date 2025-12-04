import { useCallback } from 'react';

const useScrollToSection = () => {
  const scrollToSection = useCallback((event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return scrollToSection;
};

export default useScrollToSection;
