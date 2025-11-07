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
    const video1 = document.getElementById('myVideo'); // Rinomino per chiarezza
    const video2 = document.getElementById('myVideo2'); // Nuovo video
    const playPauseBtn = document.getElementById('playPauseBtn'); // Pulsante play/pausa esistente

    const btnVideo1 = document.getElementById('btn-video-1'); // Nuovo pulsante 1
    const btnVideo2 = document.getElementById('btn-video-2'); // Nuovo pulsante 2

    if (!video1 || !video2 || !playPauseBtn || !videoContainer || !btnVideo1 || !btnVideo2) return;

    // Funzione helper per mostrare/nascondere video e attivare/disattivare pulsanti
    const showVideo = (videoToShow, videoToHide, buttonToActivate, buttonToDeactivate) => {
        // Disable the button that was just clicked to prevent double-clicks
        buttonToActivate.disabled = true;
        buttonToDeactivate.disabled = false;

        // Get corresponding text elements
        const textToShow = document.getElementById(`text-${videoToShow.id === 'myVideo' ? 'video-1' : 'video-2'}`);
        const textToHide = document.getElementById(`text-${videoToHide.id === 'myVideo' ? 'video-1' : 'video-2'}`);

        // Pausa entrambi i video prima di cambiare
        video1.pause();
        video2.pause();

        // Aggiungi la classe di uscita Animate.css al video e testo da nascondere
        videoToHide.classList.add('animate__slideOutDown');
        if (textToHide) textToHide.classList.add('animate__slideOutDown');

        // Usa Promise.all per attendere la fine di entrambe le animazioni
        Promise.all([
            new Promise(resolve => videoToHide.addEventListener('animationend', resolve, { once: true })),
            textToHide ? new Promise(resolve => textToHide.addEventListener('animationend', resolve, { once: true })) : Promise.resolve()
        ]).then(() => {
            videoToHide.classList.remove('animate__slideOutDown');
            videoToHide.classList.add('video--hidden');
            if (textToHide) {
                textToHide.classList.remove('animate__slideOutDown');
                textToHide.classList.add('video--hidden');
            }

            // Prepara il video e testo da mostrare per l'animazione di ingresso
            videoToShow.classList.remove('video--hidden');
            videoToShow.classList.add('animate__slideInUp');
            if (textToShow) {
                textToShow.classList.remove('video--hidden');
                textToShow.classList.add('animate__slideInUp');
            }

            Promise.all([
                new Promise(resolve => videoToShow.addEventListener('animationend', resolve, { once: true })),
                textToShow ? new Promise(resolve => textToShow.addEventListener('animationend', resolve, { once: true })) : Promise.resolve()
            ]).then(() => {
                videoToShow.classList.remove('animate__slideInUp');
                if (textToShow) textToShow.classList.remove('animate__slideInUp');
            });

            // Attiva il pulsante corretto
            btnVideo1.classList.remove('video-controls-bar__button--active');
            btnVideo2.classList.remove('video-controls-bar__button--active');
            buttonToActivate.classList.add('video-controls-bar__button--active');

            // Avvia il video da mostrare
            // videoToShow.play(); // Rimosso per non avviare automaticamente
            videoToShow.currentTime = 0; // Resetta il video all'inizio
        });
    };

        // Imposta lo stato iniziale: video1 visibile, video2 nascosto

        // Rimuovi la classe di posizione iniziale dal video visibile

        video1.classList.remove('video-initial-position'); // Video 1 parte già in posizione finale
        video2.classList.add('video--hidden');
        btnVideo1.classList.add('video-controls-bar__button--active');
        btnVideo1.disabled = true; // Disable the initially active button

    

        // Event listener per Bottone 1
        btnVideo1.addEventListener('click', () => {
            showVideo(video1, video2, btnVideo1, btnVideo2);
        });

    

        // Event listener per Bottone 2
        btnVideo2.addEventListener('click', () => {
            showVideo(video2, video1, btnVideo2, btnVideo1);
        });

    

        // Logica esistente per il pulsante play/pausa (controlla il video attualmente attivo)
        playPauseBtn.addEventListener('click', () => {
            const activeVideo = video1.classList.contains('video--hidden') ? video2 : video1;

            if (activeVideo.paused) {
                activeVideo.play();
            }
            else {
                activeVideo.pause();
            }

        });

    

        // Aggiungi l'icona di pausa al pulsante play/pausa esistente
        const pauseIcon = document.createElement('i');
        pauseIcon.className = 'bi bi-pause-fill';
        playPauseBtn.appendChild(pauseIcon);


        // Aggiorna UI on play (per il video attualmente attivo)
        video1.addEventListener('play', () => {
            video1.playbackRate = 1;
            videoContainer.classList.add('is-playing');
        });

        video2.addEventListener('play', () => {
            video2.playbackRate = 2;
            videoContainer.classList.add('is-playing');
        });
    

        // Aggiorna UI on pause (per il video attualmente attivo)

        video1.addEventListener('pause', () => {
            videoContainer.classList.remove('is-playing');
        });

        video2.addEventListener('pause', () => {
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