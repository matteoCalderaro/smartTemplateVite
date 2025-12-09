import { useState, useEffect, useCallback } from 'react';

// Debounce function to limit how often a function is called
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Custom hook to detect if the current viewport matches a given media query or breakpoint.
 * It is SSR-safe and debounces resize events.
 *
 * @param {string|number} query - Either a CSS media query string (e.g., "(min-width: 768px)")
 *                                or a number representing the max-width breakpoint in pixels (e.g., 992 for mobile).
 * @returns {boolean} - True if the viewport matches the query/breakpoint, false otherwise.
 */
const useMediaQuery = (query) => {
  const [isMatching, setIsMatching] = useState(false);
  const isClient = typeof window !== 'undefined';

  // Memoize the check function
  const check = useCallback(() => {
    if (!isClient) return;

    if (typeof query === 'number') {
      // If query is a number, assume it's a max-width breakpoint for mobile detection
      setIsMatching(window.innerWidth <= query);
    } else if (typeof query === 'string') {
      // If query is a string, assume it's a CSS media query
      setIsMatching(window.matchMedia(query).matches);
    }
  }, [isClient, query]);

  useEffect(() => {
    if (!isClient) return;

    check(); // Set initial state

    const debouncedCheck = debounce(check, 200);
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [isClient, check]);

  return isMatching;
};

export default useMediaQuery;
