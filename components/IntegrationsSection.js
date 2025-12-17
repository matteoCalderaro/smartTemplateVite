import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import AnimatedBeam from './ui/AnimatedBeam';

import { ArrowUpRight, MessageCircle } from 'lucide-react';

// Define icons data outside the component to prevent re-creation on render
const icons = [
  { id: 'slack', jsx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white" style={{width: '1.25rem', height: '1.25rem'}}><text x="2" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">A</text><text x="17" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">I</text></svg> },
  { id: 'figma', jsx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white" style={{width: '1.25rem', height: '1.25rem'}}><text x="2" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">B</text><text x="17" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">I</text></svg> },
  { id: 'github', jsx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" style={{width: '1.25rem', height: '1.25rem'}}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg> },
  { id: 'trello', jsx: <MessageCircle className="text-white" style={{width: '1.25rem', height: '1.25rem'}} /> },
  { id: 'database', jsx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" style={{width: '1.25rem', height: '1.25rem'}}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg> },
  { id: 'cloud', jsx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" style={{width: '1.25rem', height: '1.25rem'}}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg> },
];

const IntegrationsSection = ({ enableKaraokeEffect = true, enableFadeInAnimation = true }) => {
  const NODE_RADIUS = 3;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const zapRef = useRef(null);
  
  // Create stable refs for each icon
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const iconRefs = [ref1, ref2, ref3, ref4, ref5, ref6];

  // This effect handles the fade-in and karaoke animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (enableFadeInAnimation) {
              const staggeredElements = section.querySelectorAll('[data-stagger]');
              staggeredElements.forEach((el) => {
                el.classList.remove('fade-in-up'); 
                const delay = parseInt(el.dataset.stagger, 10) * 150;
                setTimeout(() => el.classList.add('fade-in-up'), delay);
              });
            }
            if (enableKaraokeEffect) {
                const karaokeContainers = section.querySelectorAll('.karaoke-container');
                karaokeContainers.forEach(container => {
                    const words = container.querySelectorAll('.karaoke-word');
                    words.forEach((word, index) => {
                        word.classList.remove('visible');
                        setTimeout(() => word.classList.add('visible'), index * 80);
                    });
                });
            }
          } else {
            if (enableFadeInAnimation) {
              section.querySelectorAll('[data-stagger]').forEach((el) => el.classList.remove('fade-in-up'));
            }
            if (enableKaraokeEffect) {
                section.querySelectorAll('.karaoke-word').forEach((word) => word.classList.remove('visible'));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [enableKaraokeEffect, enableFadeInAnimation]);


  return (
    <section className="integrations-section" ref={sectionRef}>
        <div className="px-4 px-sm-6 px-lg-8 mx-auto max-w-7xl">
          
          <div className="text-center" data-stagger="1">
            <span className="d-inline-flex align-items-center gap-1 rounded-pill bg-lime-400-10 px-2 py-1 text-fs-11 text-bismart-gold-light ring-lime-300-20 text-uppercase tracking-tight">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3_5 w-3_5">
                <path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path>
              </svg>
              Integrazioni
            </span>
            <h2 className="display-sm-5 h2 fw-semibold tracking-tight mt-4 karaoke-container">
                <span className="karaoke-word">Connetti</span> <span className="karaoke-word">il</span> <span className="karaoke-word">tuo</span> <span className="karaoke-word">intero</span> <span className="karaoke-word">stack</span> <span className="karaoke-word">tecnologico</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-300 fs-18px karaoke-container">
                <span className="karaoke-word text-white-50">Un'unica piattaforma, infinite possibilità!</span>
            </p>
          </div>

          <div className="position-relative mx-auto mt-5 max-w-4xl" ref={containerRef}>
            <div className="d-flex align-items-center justify-content-center gap-4 gap-sm-5" data-stagger="2">
              {icons.map((icon, index) => (
                <span key={icon.id} ref={iconRefs[index]} className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white-5 ring-white-10 icon-wrapper">
                    {icon.jsx}
                    <div className="integration-node-circle" />
                </span>
              ))}
            </div>

            <div className="position-relative mt-4 h-64" data-stagger="3">
              <div ref={zapRef} className="position-absolute bottom-0 start-50 translate-middle-x">
                <span className="d-inline-flex align-items-center justify-content-center icon-wrapper-lg logo-contianer">
                  <Image 
                    className='logo-container__logo'
                    src="/media/logo_trasparente.png" 
                    alt="Origine Raggi"
                    width={48}
                    height={48}
                  />
                </span>
              </div>
            </div>

            {iconRefs.map((ref, index) => (
                <AnimatedBeam
                    key={index}
                    containerRef={containerRef}
                    fromRef={zapRef}
                    toRef={ref}
                    curvature={index < 3 ? -60 : 60}
                    duration={50} // Speed in pixels/second (slower)
                    fromOffsetY={-20}
                    toOffsetY={NODE_RADIUS + 20}
                />
            ))}
          </div>

          <div className="mx-auto mt-5 max-w-4xl" data-stagger="4">
            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap fs-sm">
              <div className="d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bismart-gold-light" style={{width: '1rem', height: '1rem'}}><rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect></svg>
                <span className="text-white-50">Sincronizzazione istantanea</span>
              </div>
              <div className="integrations-separator"></div>

              <div className="d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bismart-gold-light" style={{width: '1rem', height: '1.25rem'}}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-white-50">Sicurezza aziendale</span>
              </div>
              <div className="integrations-separator"></div>

              <div className="d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bismart-gold-light" style={{width: '1rem', height: '1rem'}}><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                <span className="text-white-50">Aggiornamenti in tempo reale</span>
              </div>
              {/* <div className="integrations-separator"></div>

              <div className="d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bismart-gold-light" style={{width: '1rem', height: '1rem'}}><path d="M14 4.1 12 6"></path><path d="m5.1 8-2.9-.8"></path><path d="m6 12-1.9 2"></path><path d="M7.2 2.2 8 5.1"></path><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path></svg>
                <span className="fw-medium">Configurazione con un clic</span>
              </div> */}
            </div>
          </div>
        </div>
    </section>
  );
};

export default IntegrationsSection;