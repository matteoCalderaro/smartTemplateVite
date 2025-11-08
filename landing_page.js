import { formValidation } from '@form-validation/bundle/popular';
import { Trigger } from '@form-validation/plugin-trigger';
import { Bootstrap5 } from '@form-validation/plugin-bootstrap5';
import { Message } from '@form-validation/plugin-message';
import '@form-validation/core/lib/styles/index.min.css';
import '@form-validation/plugin-bootstrap5/lib/styles/index.min.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2

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
                };
                
                setTimeout(() => {
                    const simulateSuccess = (formData.email !== 'error@error.com');
                    if (simulateSuccess) {
                        window.location.href = 'thank-you.html';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Errore nell\'invio!',
                            text: 'Si è verificato un problema durante l\'invio della richiesta. Riprova più tardi.',
                            confirmButtonText: 'Ok'
                        });
                        hideSpinner();
                    }
                }, 2000);
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

const initVideo = () => {
    const videoContainer = document.querySelector('.video-player-container');

    // Flag per la modalità di sviluppo/produzione
    const isDevelopment = false; // Imposta a 'true' per sviluppo, 'false' per produzione

    // --- Video Sources Configuration ---
    // Production URLs (Cloudinary)
    const videoSourcesProd = {
        voice: {
            mobile: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608766/voice_mob_zpzqmw.mp4",
            desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608735/voice_desk_mv1mv7.mp4"
        },
        insights: {
            mobile: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608783/insights_mob_nakb1s.mp4",
            desktop: "https://res.cloudinary.com/dpockyqnm/video/upload/v1762608749/insights_desk_r4gp16.mp4"
        }
    };

    // Development URLs (Local)
    const videoSourcesDev = {
        voice: {
            mobile: "/media/video/mobile/voice.mp4",
            desktop: "/media/video/desktop/voice.mp4"
        },
        insights: {
            mobile: "/media/video/mobile/insights.mp4", // Using desktop version as placeholder
            desktop: "/media/video/desktop/insights.mp4"
        }
    };

    // Select sources based on the isDevelopment flag
    const videoSources = isDevelopment ? videoSourcesDev : videoSourcesProd;
    // --- End of Configuration ---
    
    // Get all video elements
    const voiceMobile = document.getElementById('voiceMobile');
    const voiceDesktop = document.getElementById('voiceDesktop');
    const insightsMobile = document.getElementById('insightsMobile');
    const insightsDesktop = document.getElementById('insightsDesktop');

    const playPauseBtn = document.getElementById('playPauseBtn');

    const btnVideo1 = document.getElementById('btn-voice');
    const btnVideo2 = document.getElementById('btn-insights');

    if (!voiceMobile || !voiceDesktop || !insightsMobile || !insightsDesktop || !playPauseBtn || !videoContainer || !btnVideo1 || !btnVideo2) return;

    // Set sources for all videos from the config object
    voiceMobile.src = videoSources.voice.mobile;
    voiceDesktop.src = videoSources.voice.desktop;
    insightsMobile.src = videoSources.insights.mobile;
    insightsDesktop.src = videoSources.insights.desktop;

    const isMobile = window.innerWidth < 576; // Using Bootstrap's 'sm' breakpoint

    let activeVideo1, activeVideo2;

    if (isMobile) {
        activeVideo1 = voiceMobile;
        activeVideo2 = insightsMobile;
        voiceDesktop.classList.add('d-none'); // Ensure desktop is hidden
        insightsDesktop.classList.add('d-none');
        voiceMobile.classList.remove('d-none'); // Ensure mobile is visible
        insightsMobile.classList.remove('d-none');
    } else {
        activeVideo1 = voiceDesktop;
        activeVideo2 = insightsDesktop;
        voiceMobile.classList.add('d-none'); // Ensure mobile is hidden
        insightsMobile.classList.add('d-none');
        voiceDesktop.classList.remove('d-none'); // Ensure desktop is visible
        insightsDesktop.classList.remove('d-none');
    }

    // Ensure the initially hidden video (activeVideo2) has its src set
    // and is hidden with video--hidden class
    activeVideo2.classList.add('video--hidden');


    // Funzione helper per mostrare/nascondere video e attivare/disattivare pulsanti
    const showVideo = (videoToShow, videoToHide, buttonToActivate, buttonToDeactivate) => {
        // Disable the button that was just clicked to prevent double-clicks
        buttonToActivate.disabled = true;
        buttonToDeactivate.disabled = false;

        // Get corresponding text elements
        const textToShow = document.getElementById(`text-${videoToShow.id.includes('myVideo2') ? 'video-2' : 'video-1'}`);
        const textToHide = document.getElementById(`text-${videoToHide.id.includes('myVideo2') ? 'video-2' : 'video-1'}`);

        // Pausa entrambi i video prima di cambiare
        activeVideo1.pause();
        activeVideo2.pause();

        // Aggiungi la classe di uscita Animate.css al video e testo da nascondere
        videoToHide.classList.add('animate__fadeOut');
        if (textToHide) textToHide.classList.add('animate__fadeOut');

        // Usa Promise.all per attendere la fine di entrambe le animazioni
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

            // Prepara il video e testo da mostrare per l'animazione di ingresso
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

            // Attiva il pulsante corretto
            btnVideo1.classList.remove('video-controls-bar__button--active');
            btnVideo2.classList.remove('video-controls-bar__button--active');
            buttonToActivate.classList.add('video-controls-bar__button--active');

            videoToShow.currentTime = 0; // Resetta il video all'inizio
        });
    };

    // Imposta lo stato iniziale: activeVideo1 visibile, activeVideo2 nascosto
    activeVideo1.classList.remove('video--hidden');
    activeVideo2.classList.add('video--hidden');
    btnVideo1.classList.add('video-controls-bar__button--active');
    btnVideo1.disabled = true;

    // Event listener per Bottone 1
    btnVideo1.addEventListener('click', () => {
        showVideo(activeVideo1, activeVideo2, btnVideo1, btnVideo2);
    });

    // Event listener per Bottone 2
    btnVideo2.addEventListener('click', () => {
        showVideo(activeVideo2, activeVideo1, btnVideo2, btnVideo1);
    });

    // Logica esistente per il pulsante play/pausa (controlla il video attualmente attivo)
    playPauseBtn.addEventListener('click', () => {
        const currentActiveVideo = activeVideo1.classList.contains('video--hidden') ? activeVideo2 : activeVideo1;

        if (currentActiveVideo.paused) {
            currentActiveVideo.play();
        } else {
            currentActiveVideo.pause();
        }
    });

    // Aggiungi l'icona di pausa al pulsante play/pausa esistente
    const pauseIcon = document.createElement('i');
    pauseIcon.className = 'bi bi-pause-fill';
    playPauseBtn.appendChild(pauseIcon);

    // Aggiorna UI on play (per il video attualmente attivo)
    activeVideo1.addEventListener('play', () => {
        activeVideo1.playbackRate = 1;
        videoContainer.classList.add('is-playing');
    });

    activeVideo2.addEventListener('play', () => {
        activeVideo2.playbackRate = 1;
        videoContainer.classList.add('is-playing');
    });

    // Aggiorna UI on pause (per il video attualmente attivo)
    activeVideo1.addEventListener('pause', () => {
        videoContainer.classList.remove('is-playing');
    });

    activeVideo2.addEventListener('pause', () => {
        videoContainer.classList.remove('is-playing');
    });
};


// =========================================================================
// DOM CONTENT LOADED - SCRIPT INITIALIZER
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scripts based on the page's data attribute
    if (document.body.dataset.page === 'home') {
        initClickToScroll();
        initForm();
        initPrivacyModal();
        initVideo();
    }
    // Example for another page:
    // else if (document.body.dataset.page === 'contact') {
    //     initContactPageScripts();
    // }
});