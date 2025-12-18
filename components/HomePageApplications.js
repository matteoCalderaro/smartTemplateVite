import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { Lock, Box, ArrowUpRight } from 'lucide-react';
import { ApplicationCard } from './ApplicationCard.js';
import { ICONS, MOCK_APPS } from '../data/applications-home-page.js';
import ConnectorLineSVG from './ui/ConnectorLineSVG.js';
import { useRouter } from 'next/router';


const HomePageApplications = () => {
  const [selectedAppId, setSelectedAppId] = useState(MOCK_APPS[0].id);
  const [linePath, setLinePath] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const cardRefs = useRef(new Map());
  const imageContainerRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateConnectorLine = () => {
    const activeId = selectedAppId;
    const cardEl = cardRefs.current.get(activeId);
    const imageEl = imageContainerRef.current;
    const containerEl = containerRef.current;

    if (cardEl && imageEl && containerEl) {
      const cardRect = cardEl.getBoundingClientRect();
      const imageRect = imageEl.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const startX = cardRect.right - containerRect.left;
      const startY = (cardRect.top + cardRect.height / 2) - containerRect.top;
      
      const endX = imageRect.left - containerRect.left;
      const endY = (imageRect.top + imageRect.height / 2) - containerRef.current.getBoundingClientRect().top;

      const controlPointX1 = startX + (endX - startX) * 0.5;
      const controlPointX2 = startX + (endX - startX) * 0.5;

      const path = `M ${startX} ${startY} C ${controlPointX1} ${startY}, ${controlPointX2} ${endY}, ${endX} ${endY}`;
      setLinePath(path);
    }
  };

  useEffect(() => {
    if (isMounted) {
      updateConnectorLine();
      window.addEventListener('resize', updateConnectorLine);
      window.addEventListener('scroll', updateConnectorLine);
      return () => {
        window.removeEventListener('resize', updateConnectorLine);
        window.removeEventListener('scroll', updateConnectorLine);
      };
    }
  }, [selectedAppId, isMounted]);

  const displayedApp = MOCK_APPS.find(p => p.id === selectedAppId) || MOCK_APPS[0];
  const DetailIcon = ICONS[displayedApp.iconName] || Box;

  const setCardRef = (id, el) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  };

  const handleDirectNavigation = (path) => {
    console.log(path);
    router.push(`/${path}`);
  };

  return (
    <section className="homepage-applications position-relative w-100 section-padding-bottom">
      
      <div className="homepage-applications__radial-stage-gradient position-absolute top-0 start-0 end-0 bottom-0" />
      
      <div className="homepage-applications__seamless-blend-overlay position-absolute top-0 start-0 end-0 bottom-0" />

      <main ref={containerRef} className="position-relative mx-auto container" style={{maxWidth: '1000px'}}>
        
        {isMounted && (
          <ConnectorLineSVG 
            linePath={linePath}
          />
        )}

        <div className="main-grid">
          
          <div className="apps d-flex flex-column gap-4">
            <div className="mb-2">
              <h1 className="apps__title text-white">La suite BiSmart</h1>
              <p className="apps__description text-white-50">
                Tecnologie <span className="color-text-gold-light">cucite</span> su misura per Te!
              </p>
            </div>
            
            <div className="d-flex flex-column gap-3">
              {MOCK_APPS.map((app) => (
                <ApplicationCard
                  key={app.id}
                  ref={(el) => setCardRef(app.id, el)}
                  app={app}
                  isSelected={selectedAppId === app.id}
                  isHovered={false}
                  onClick={() => setSelectedAppId(app.id)}
                  onNavigate={() => handleDirectNavigation(app.path)}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              ))}
            </div>
          </div>

          <div className="image">
              
              <div ref={imageContainerRef} className="sticky-container">

                <div className="wrapper" >
                  
                  <div key={displayedApp.id} className="image-card d-flex flex-column rounded-4 overflow-hidden shadow border border-white border-opacity-10 animate-floatIn">

                    <div className="header d-flex align-items-center px-4 border-bottom border-white border-opacity-10">
                      <div className="header__traffic-lights d-flex gap-2">
                        <div className="rounded-circle" ></div>
                        <div className="rounded-circle" ></div>
                        <div className="rounded-circle" ></div>
                      </div>
                      <div className="header__url-bar mx-auto fw-medium d-flex align-items-center gap-2">
                        <Lock style={{width: '0.75rem', height: '0.75rem', opacity: 0.9}} />
                        bismart://{displayedApp.name.toLowerCase().replace(/\s/g, '-')}
                      </div>
                    </div>

                    <div className="body position-relative">
                       <Image
                          src={`/media/app-images/${displayedApp.imageName}`}
                          alt={displayedApp.name}
                          fill
                          sizes="(max-width: 991px) 100vw, 66vw"
                          className="object-fit-cover"
                          style={{opacity: 0.9, filter: 'brightness(1.1) contrast(1.05)', transition: 'transform 700ms ease-out'}}
                        />

                        <div className="overlay position-absolute top-0 start-0 end-0 bottom-0" />
                        
                        <div className="footer position-absolute bottom-0 start-0 end-0 p-4">
                          
                          <div className="footer-wrapper d-flex align-items-center justify-content-between gap-4 rounded-3 border border-white border-opacity-10 shadow-lg">
                             
                             <div className="info d-flex align-items-center gap-4">
                                <div className="info--icon p-2 rounded-3">
                                  <DetailIcon style={{width: '1.75rem', height: '1.75rem'}} />
                                </div>
                                <div className='info--labels'>
                                   <h2 className="fw-bold text-white lh-1">{displayedApp.name}</h2>
                                   <span className="text-uppercase fw-semibold">{displayedApp.category}</span>
                                </div>
                             </div>

                            <button 
                              className="btn fw-bold py-2 px-4 d-flex align-items-center gap-2 text-nowrap"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDirectNavigation(displayedApp.path);
                              }}
                            >
                              Scopri di più
                              <ArrowUpRight size={20} />
                            </button>

                          </div>

                        </div>
                    </div>
                  </div>

                </div>

              </div>

          </div>

        </div>

      </main>
      
    </section>
  );
};

export default HomePageApplications;
