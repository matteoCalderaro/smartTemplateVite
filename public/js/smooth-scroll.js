/**
 * @file smooth-scroll.js
 * @description Questo script gestisce lo scorrimento fluido (smooth scroll) verso ancore interne della pagina.
 *              Si attiva al caricamento completo del DOM.
 *              Intercetta i click su tutti gli elementi `<a>` che possiedono l'attributo `data-scroll-to`.
 *              Quando un tale link viene cliccato, previene il comportamento di default del browser
 *              e avvia uno scorrimento animato verso l'elemento il cui `id` corrisponde al `hash` del link (es. `href="#sezione"`).
 *              Inoltre, pulisce l'URL dalla hash dopo lo scorrimento per mantenere l'URL pulito.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('smooth-scroll.js loaded and DOMContentLoaded fired.');

    document.addEventListener('click', (event) => {
        const targetLink = event.target.closest('a[data-scroll-to]');

        if (targetLink && targetLink.hash) {
            const targetId = targetLink.hash;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                console.log('smooth-scroll.js: Target link clicked, preventing default.', targetLink);
                event.preventDefault(); // Prevent default anchor link behavior

                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Clean the URL after scrolling
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname);
                    console.log('smooth-scroll.js: URL cleaned using replaceState.');
                } else {
                    // Fallback for older browsers
                    window.location.hash = '';
                    console.log('smooth-scroll.js: URL cleaned using window.location.hash.');
                }
            }
        }
    });
});
