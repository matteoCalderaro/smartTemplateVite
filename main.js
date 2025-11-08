import './landing_page.js';
import './scss/main.scss';

// Make body visible only after all resources are loaded to prevent FOUC and layout shifts.
window.addEventListener('load', () => {
    document.body.classList.remove('is-loading');
});