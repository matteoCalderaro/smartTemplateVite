import { formValidation } from '@form-validation/bundle/popular';
import { Trigger } from '@form-validation/plugin-trigger';
import { Bootstrap5 } from '@form-validation/plugin-bootstrap5';
import { Message } from '@form-validation/plugin-message';
import '@form-validation/core/lib/styles/index.min.css';
import '@form-validation/plugin-bootstrap5/lib/styles/index.min.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import IMask from 'imask';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0); // Reset scroll position on load/refresh

// Constants for animation and scroll behavior
const FADE_SPEED = 1.5;
const MAX_MOVE_AMOUNT = 300;
const SCROLL_THRESHOLD = 50;

// Tab switching logic
const tabButtons = document.querySelectorAll('.video-tabs__button');
const videoContents = document.querySelectorAll('.video-tabs__content');

if (tabButtons.length > 0 && videoContents.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            videoContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const targetId = button.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    const anyActive = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
    if (!anyActive) {
        tabButtons[0].classList.add('active');
        const firstTargetId = tabButtons[0].dataset.target;
        const firstTargetContent = document.getElementById(firstTargetId);
        if(firstTargetContent) {
            firstTargetContent.classList.add('active');
        }
    }
}

// Sticky hero fade-out logic
const heroSection = document.querySelector('#hero');
const heroSideImageLeft = document.querySelector('.hero-side-image--left');
const heroSideImageRight = document.querySelector('.hero-side-image--right');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        let opacity = 1 - (scrollPosition / (heroHeight / FADE_SPEED));
        
        if (opacity < 0) {
            opacity = 0;
        }
        if (opacity > 1) {
            opacity = 1;
        }
        
        heroSection.style.opacity = opacity;
        
        // Side images animation logic (move outwards)
        if (heroSideImageLeft && heroSideImageRight) {
            
            let moveAmount = Math.min(scrollPosition, heroHeight) / (heroHeight / MAX_MOVE_AMOUNT);
            
            // Move outwards as content scrolls up
            heroSideImageLeft.style.transform = `translateX(${-moveAmount}px)`;
            heroSideImageRight.style.transform = `translateX(${moveAmount}px)`;
        }
    });
}

// Sticky navbar logic
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// =========================================================================
// PAGE-SPECIFIC SCRIPTS INITIALIZATION
// =========================================================================


const initClickToScroll = () => {
    const scrollLinks = document.querySelectorAll('[data-scroll-to]');
    if (scrollLinks.length === 0) return;
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

const initForm = () => {
    const form = document.getElementById('form-contatti');
    if (!form) return;

    const phoneInput = form.querySelector('[name="phone"]');
    if (phoneInput) {
        const phoneMask = IMask(phoneInput, {
            mask: /^[0-9\s+()-]*$/
        });
    }
    
    const submitButton = document.getElementById("submit");
    if (!submitButton) return;
    
    const spinner = submitButton.querySelector('.spinner-border');
    const buttonText = submitButton.querySelector('.button-text');
    
    const showSpinner = () => {
        if (spinner) spinner.classList.remove('d-none');
        submitButton.disabled = true;
    };
    
    const hideSpinner = () => {
        if (spinner) spinner.classList.add('d-none');
        if (buttonText) buttonText.classList.remove('d-none');
        submitButton.disabled = false;
    };
    
    const validator = formValidation(form, {
        fields: {
            'name': { validators: { notEmpty: { message: "Il nome è obbligatorio" } } },
            'cognome': { validators: { notEmpty: { message: "Il cognome è obbligatorio" } } },
            'email': {
                validators: {
                    notEmpty: { message: "L'email è obbligatoria" },
                    emailAddress: { message: "L'email non è valida" }
                }
            },
            'phone': {
                validators: {
                    notEmpty: { message: "Il numero di telefono è obbligatorio" }
                }
            },
            'privacy': { validators: { notEmpty: { message: "Devi accettare l'informativa sulla privacy" } } }
        },
        plugins: {
            trigger: new Trigger(),
            bootstrap: new Bootstrap5({
                eleInvalidClass: '',
                eleValidClass: '',
                rowSelector: '.fv-row',
                defaultMessageContainer: false,
                feedbackIcons: false
            }),
            message: new Message({
                container: (field) => {
                    const inputElement = form.querySelector(`[name="${field}"]`);
                    if (inputElement) {
                        const container = inputElement.closest('.form-check, .form-floating');
                        return container ? container.querySelector('.invalid-feedback') : null;
                    }
                    return null;
                }
            })
        }
    });
    
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        validator.validate().then((status) => {
            if (status === "Valid") {
                showSpinner();
                const formData = {
                    name: form.querySelector('[name="name"]').value,
                    cognome: form.querySelector('[name="cognome"]').value,
                    email: form.querySelector('[name="email"]').value,
                    phone: form.querySelector('[name="phone"]').value,
                    notes: form.querySelector('[name="notes"]').value,
                };
                
                fetch('/Voice2Insight/SendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json()) // Tenta sempre di parsare il JSON
                .then(data => {
                    if (data.success) {
                        window.location.href = 'thank-you';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Errore nell\'invio!',
                            text: data.message || 'Si è verificato un problema durante l\'invio della richiesta.',
                            confirmButtonText: 'Ok'
                        });
                        hideSpinner();
                    }
                })
                .catch(error => { // Gestisce errori di rete E errori di parsing JSON
                    console.error('Errore:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Errore!',
                        text: 'Si è verificato un problema. Controlla la tua connessione e riprova.',
                        confirmButtonText: 'Ok'
                    });
                    hideSpinner();
                });
            }
        });
    });
};

const initPrivacyModal = () => {
    const privacyPolicyModalElement = document.getElementById('privacyPolicyModal');
    if (!privacyPolicyModalElement) return;
    
    const privacyPolicyModal = new bootstrap.Modal(privacyPolicyModalElement);
    const clickablePrivacyLink = document.querySelector('.privacy-link');
    
    if (clickablePrivacyLink) {
        clickablePrivacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyPolicyModal.show();
        });
    }
};

const initScrollToTop = () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const triggerElement = document.getElementById('voice-to-insights-copy');

    if (!scrollToTopBtn || !triggerElement) {
        return;
    }

    const updateButtonVisibility = () => {
        const triggerElementRect = triggerElement.getBoundingClientRect();
        if (triggerElementRect.bottom < 0) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility(); // Check initial state on load

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

const initVideo = () => {
    // 1. --- SETUP & CONFIGURATION ---
    const videoContainer = document.querySelector('.video-player-container');
    const voiceMobile = document.getElementById('voiceMobile');
    const voiceDesktop = document.getElementById('voiceDesktop');
    const insightsMobile = document.getElementById('insightsMobile');
    const insightsDesktop = document.getElementById('insightsDesktop');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const btnVideo1 = document.getElementById('btn-voice');
    const btnVideo2 = document.getElementById('btn-insights');

    // Exit if essential elements are missing
    if (!voiceMobile || !voiceDesktop || !insightsMobile || !insightsDesktop || !playPauseBtn || !videoContainer || !btnVideo1 || !btnVideo2) return;

    const isDevelopment = false; // Imposta a 'false' per cloudinary, 'true' per asset
    const videoSourcesProd = {
        voice: {
            mobile: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608766/voice_mob_zpzqmw.mp4",
            // desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608735/voice_desk_mv1mv7.mp4" // zoommato
            desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1763019479/voice_desk_full_size_x8h1tg.mp4"
        },
        insights: {
            mobile: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608783/insights_mob_nakb1s.mp4",
            // desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608749/insights_desk_r4gp16.mp4" // zoommato
            desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1763019020/insights_desk_full_size_t3czep.mp4"
        }
    };
    const videoSourcesDev = {
        voice: {
            mobile: "/media/video/mobile/voice_mob.mp4",
            desktop: "/media/video/desktop/voice_desk.mp4"
        },
        insights: {
            mobile: "/media/video/mobile/insights_mob.mp4",
            desktop: "/media/video/desktop/insights_desk.mp4"
        }
    };
    const videoSources = isDevelopment ? videoSourcesDev : videoSourcesProd;

    // Assign sources
    voiceMobile.src = videoSources.voice.mobile;
    voiceDesktop.src = videoSources.voice.desktop;
    insightsMobile.src = videoSources.insights.mobile;
    insightsDesktop.src = videoSources.insights.desktop;

    // State variables
    let activeVideo1, activeVideo2;

    // 2. --- UTILITY FUNCTIONS ---
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
    const isMobile = () => window.innerWidth < 576;

    // 3. --- CORE LOGIC ---

    // Updates which videos are active and visible based on screen size and current theme
    const updateVideoVisibility = () => {
        const wasOnInsights = btnVideo2.classList.contains('video-controls-bar__button--active');
        [voiceMobile, voiceDesktop, insightsMobile, insightsDesktop].forEach(v => v.pause());

        if (isMobile()) {
            activeVideo1 = voiceMobile;
            activeVideo2 = insightsMobile;
            voiceDesktop.classList.add('d-none');
            insightsDesktop.classList.add('d-none');
            voiceMobile.classList.remove('d-none');
            insightsMobile.classList.remove('d-none');
        } else {
            activeVideo1 = voiceDesktop;
            activeVideo2 = insightsDesktop;
            voiceMobile.classList.add('d-none');
            insightsMobile.classList.add('d-none');
            voiceDesktop.classList.remove('d-none');
            insightsDesktop.classList.remove('d-none');
        }

        if (wasOnInsights) {
            activeVideo1.classList.add('video--hidden');
            activeVideo2.classList.remove('video--hidden');
        } else {
            activeVideo1.classList.remove('video--hidden');
            activeVideo2.classList.add('video--hidden');
        }
    };

    // Handles the animated transition between video themes
    const showVideo = (videoToShow, videoToHide, buttonToActivate, buttonToDeactivate) => {
        // --- IMMEDIATE FEEDBACK ---
        buttonToActivate.disabled = true;
        buttonToDeactivate.disabled = false;
        btnVideo1.classList.remove('video-controls-bar__button--active');
        btnVideo2.classList.remove('video-controls-bar__button--active');
        buttonToActivate.classList.add('video-controls-bar__button--active');
        // --- END IMMEDIATE FEEDBACK ---

        const textToShow = document.getElementById(`text-${videoToShow.id.toLowerCase().includes('insights') ? 'video-2' : 'video-1'}`);
        const textToHide = document.getElementById(`text-${videoToHide.id.toLowerCase().includes('insights') ? 'video-2' : 'video-1'}`);

        activeVideo1.pause();
        activeVideo2.pause();

        videoToHide.classList.add('animate__fadeOut');
        if (textToHide) textToHide.classList.add('animate__fadeOut');

        Promise.all([
            new Promise(resolve => videoToHide.addEventListener('animationend', resolve, { once: true })),
            textToHide ? new Promise(resolve => textToHide.addEventListener('animationend', resolve, { once: true })) : Promise.resolve()
        ]).then(() => {
            videoToHide.classList.remove('animate__fadeOut');
            videoToHide.classList.add('video--hidden');
            if (textToHide) {
                textToHide.classList.remove('animate__fadeOut');
                textToHide.classList.add('video--hidden');
            }

            videoToShow.classList.remove('video--hidden');
            videoToShow.classList.add('animate__fadeIn');
            if (textToShow) {
                textToShow.classList.remove('video--hidden');
                textToShow.classList.add('animate__fadeIn');
            }

            Promise.all([
                new Promise(resolve => videoToShow.addEventListener('animationend', resolve, { once: true })),
                textToShow ? new Promise(resolve => textToShow.addEventListener('animationend', resolve, { once: true })) : Promise.resolve()
            ]).then(() => {
                videoToShow.classList.remove('animate__fadeIn');
                if (textToShow) textToShow.classList.remove('animate__fadeIn');
            });

            videoToShow.currentTime = 0;
        });
    };

    // 4. --- EVENT HANDLERS & INITIALIZATION ---

    btnVideo1.addEventListener('click', () => {
        if (!activeVideo1.classList.contains('video--hidden')) return;
        showVideo(activeVideo1, activeVideo2, btnVideo1, btnVideo2);
    });

    btnVideo2.addEventListener('click', () => {
        if (!activeVideo2.classList.contains('video--hidden')) return;
        showVideo(activeVideo2, activeVideo1, btnVideo2, btnVideo1);
    });

    playPauseBtn.addEventListener('click', () => {
        const currentActiveVideo = activeVideo1.classList.contains('video--hidden') ? activeVideo2 : activeVideo1;
        if (currentActiveVideo.paused) {
            currentActiveVideo.play();
        } else {
            currentActiveVideo.pause();
        }
    });

    [voiceMobile, voiceDesktop, insightsMobile, insightsDesktop].forEach(video => {
        video.addEventListener('play', () => {
            video.playbackRate = 1;
            videoContainer.classList.add('is-playing');
        });
        video.addEventListener('pause', () => {
            videoContainer.classList.remove('is-playing');
        });
    });
    
    const pauseIcon = document.createElement('i');
    pauseIcon.className = 'bi bi-pause-fill';
    playPauseBtn.appendChild(pauseIcon);

    window.addEventListener('resize', debounce(updateVideoVisibility, 200));

    // Initial state setup
    updateVideoVisibility();
    btnVideo1.classList.add('video-controls-bar__button--active');
    btnVideo1.disabled = true;
};


// =========================================================================
// DOM CONTENT LOADED - SCRIPT INITIALIZER
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scripts based on the page's data attribute
    if (document.body.dataset.page === 'home') {
        initClickToScroll();
        initForm();
        //initPrivacyModal();
        initScrollToTop();
        initVideo();
    }
    // Example for another page:
    // else if (document.body.dataset.page === 'contact') {
    //     initContactPageScripts();
    // }
});