import './landing_page.js';
import './scss/main.scss';

// Make body visible after styles have been loaded to prevent FOUC
document.body.classList.remove('is-loading');

// Function to execute when screen width is less than 576px
function handleSmallScreen(mediaQuery) {
  if (mediaQuery.matches) {
    console.log('Screen width is less than 576px (sm breakpoint)');
    // Add your specific logic here for small screens
    // For example:
    // document.getElementById('myElement').classList.add('mobile-only-style');
  } else {
    console.log('Screen width is 576px or greater');
    // Add your specific logic here for larger screens
    // For example:
    // document.getElementById('myElement').classList.remove('mobile-only-style');
  }
}

// Define the media query for screens smaller than 576px
const smBreakpointMediaQuery = window.matchMedia('(max-width: 575.98px)');

// Add a listener for changes in the media query status
smBreakpointMediaQuery.addEventListener('change', handleSmallScreen);

// Initial check when the page loads
handleSmallScreen(smBreakpointMediaQuery);
