import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Nav, NavDropdown, Container } from 'react-bootstrap'; // Reimportati
import { useRouter } from 'next/router';
import applications from '../data/applications'; // Reimportati
import useScrollPosition from '../hooks/useScrollPosition';
import MenuOverlay from './MenuOverlay';
import useMediaQuery from '../hooks/useMediaQuery'; // Importato

const NewNavbar = ({ minimal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Usa useMediaQuery per rilevare se è mobile (meno di 768px)
  const isMobile = useMediaQuery(767); // Corrisponde a "meno di" del breakpoint 'md' di Bootstrap

  useEffect(() => {
    setIsScrolled(scrollPosition > 0);
  }, [scrollPosition]);

  // Gestisce lo scroll del body quando il menu è aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // Ripristina lo stato predefinito
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''; // Assicura che lo scroll sia ripristinato quando il componente si smonta
    };
  }, [isMenuOpen]); // Dipende da isMenuOpen

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBrandClick = () => {
    if (isMenuOpen) { // Se il menu è aperto, chiudilo quando si clicca sul brand
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`navbar navbar-expand-md ${isScrolled ? 'navbar-scrolled' : ''} py-2`} // Modificato expand-lg a expand-md
        data-bs-theme="dark" // Aggiunto per garantire che l'icona del toggler sia visibile
        style={{ zIndex: 1010 }}
      >
        <Container> {/* Reimportato Container */}
          <Link className="d-flex align-items-center me-auto gap-3 text-decoration-none" href="/" onClick={handleBrandClick}>
            <div className="navbar-brand">
              <Image src={router.basePath + "/media/logo_trasparente.png"} alt="BiSmart Logo" width={62} height={50} />
              <h1 className="fs-3 fw-bold text-white mb-0 d-inline-block ms-3">bismart.ai</h1>
            </div>
          </Link>
          
          {/* Versione Mobile: bottone toggle (visibile solo su mobile via CSS) */}
          <button
            className="navbar-toggler d-md-none" // d-md-none: Nascondi su schermi >= md
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
          
          {/* Versione Desktop: NavDropdown e Nav.Link (visibile solo su desktop via CSS) */}
          <Nav className="ms-auto d-none d-md-flex align-items-center gap-3"> {/* d-none: Nascondi su mobile, d-md-flex: Mostra su schermi >= md */}
            {!minimal && (
              <> {/* Frammento per raggruppare i link e il bottone */}
                <NavDropdown
                  title="Applicazioni"
                  id="applications-dropdown"
                  menuVariant="dark"
                  className=""
                >
                  {applications
                    .filter(app => !app.isHome)
                    .map((app) => (
                      <NavDropdown.Item
                        key={app.path}
                        as={Link}
                        href={`/${app.path}`}
                        active={router.asPath === `/${app.path}`}
                      >
                        {app.heroContent.brand}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
                <Nav.Link href="#info" className="color-text-gold-light" style={{ pointerEvents: 'none' }}>Informazioni</Nav.Link>
                <Link href="/" className="btn-login d-none">Accedi</Link>
              </>
            )}
          </Nav>
        </Container>
      </nav>
      {/* Renderizzazione condizionale dell'Overlay, mostrato solo se mobile */}
      {isMobile && <MenuOverlay closeMenu={toggleMenu} isMenuOpen={isMenuOpen} />}
    </>
  );
};

export default NewNavbar;