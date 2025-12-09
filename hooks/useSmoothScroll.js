import { useEffect } from 'react';

/**
 * @hook useSmoothScroll
 * @description Questo hook gestisce lo scorrimento fluido (smooth scroll) verso ancore interne della pagina.
 *              Aggiunge un listener di eventi click al documento per intercettare i click sui link
 *              che hanno l'attributo `data-scroll-to`.
 *              Quando un tale link viene cliccato, previene il comportamento di default del browser,
 *              avvia uno scorrimento animato verso l'elemento di destinazione e
 *              pulisce l'URL dall'hash dopo lo scorrimento.
 */
const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (event) => {
      // Trova l'elemento <a> più vicino che ha l'attributo data-scroll-to
      const targetLink = event.target.closest('a[data-scroll-to]');

      // Se il link esiste e ha un hash (es. #sezione)
      if (targetLink && targetLink.hash) {
        const targetId = targetLink.hash;
        const targetElement = document.querySelector(targetId);

        // Se l'elemento di destinazione esiste sulla pagina
        if (targetElement) {
          event.preventDefault(); // Previene il salto immediato del browser

          // Esegue lo scorrimento fluido
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Pulisce l'URL dall'hash dopo un breve ritardo per garantire che lo scroll sia completato
          setTimeout(() => {
            if (window.history && window.history.replaceState) {
              // Metodo moderno per pulire l'URL senza ricaricare la pagina
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            } else {
              // Fallback per browser più vecchi
              window.location.hash = '';
            }
          }, 1000); // Il ritardo assicura che lo scroll termini prima della pulizia dell'URL
        }
      }
    };

    // Aggiunge l'event listener al documento
    document.addEventListener('click', handleClick);

    // Funzione di cleanup che viene eseguita quando il componente si smonta
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo una volta (al mount)
};

export default useSmoothScroll;
