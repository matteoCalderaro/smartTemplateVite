/**
 * @file useScrollPosition.js
 * @description Custom hook React per rilevare la posizione verticale dello scroll della finestra (window.scrollY).
 *              Fornisce la posizione di scroll corrente e si aggiorna ad ogni evento di scorrimento.
 *              Utilizza `useState` e `useEffect` per gestire lo stato della posizione e per
 *              aggiungere/rimuovere l'event listener 'scroll' in modo sicuro.
 *
 * @returns {number} La posizione verticale corrente dello scroll (scrollY) in pixel.
 */

import { useState, useEffect } from 'react';

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition(); // Set initial position

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}
