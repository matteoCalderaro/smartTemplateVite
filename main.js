import './landing_page.js';
import './scss/main.scss';

// Make body visible only after all resources are loaded to prevent FOUC and layout shifts.
window.addEventListener('load', () => {
    document.body.classList.remove('is-loading');

    // Marquee Animation (JavaScript controlled)
    const marqueeContent = document.querySelector('.marquee__content');
    if (marqueeContent) {
        // Duplicate the content for a seamless loop
        const originalContent = marqueeContent.innerHTML;
        marqueeContent.innerHTML += originalContent; // Add a second copy

        let currentScroll = 0;
        const scrollSpeed = 0.5; // Adjust for desired speed
        let animationFrameId;

        function animateMarquee() {
            // Calculate the width of a single set of items (original content)
            // We need to get the width of the first child of marqueeContent, which is the original content
            // Or, more reliably, calculate the total width of all items in the first set.
            // For simplicity, let's assume the total width of the original content is half of the current scrollWidth of marqueeContent
            const singleContentWidth = marqueeContent.scrollWidth / 2;

            currentScroll += scrollSpeed;

            if (currentScroll >= singleContentWidth) {
                currentScroll = 0; // Reset to start for a seamless loop
            }

            marqueeContent.style.transform = `translateX(-${currentScroll}px)`;

            animationFrameId = requestAnimationFrame(animateMarquee);
        }

        // Start animation when the page is loaded
        animateMarquee();

        // Optional: Pause animation on hover
        marqueeContent.parentElement.addEventListener('mouseenter', () => {
            cancelAnimationFrame(animationFrameId);
        });

        marqueeContent.parentElement.addEventListener('mouseleave', () => {
            animateMarquee();
        });
    }
});
