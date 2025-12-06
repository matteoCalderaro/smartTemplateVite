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
