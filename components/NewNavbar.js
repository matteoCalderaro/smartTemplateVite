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

  // Usa useMediaQuery per rilevare se è mobile (meno di 992px)
  const isMobile = useMediaQuery(992); // Corrisponde al breakpoint 'lg' di Bootstrap

  useEffect(() => {
    setIsScrolled(scrollPosition > 0);
  }, [scrollPosition]);

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
        className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''} py-2`}
        data-bs-theme="dark" // Aggiunto per garantire che l'icona del toggler sia visibile
        style={{ zIndex: 1010 }}
      >
        <Container> {/* Reimportato Container */}
          <Link className="d-flex align-items-center me-auto gap-3 text-decoration-none" href="/" passHref onClick={handleBrandClick}>
            <div className="navbar-brand">
              <Image src={router.basePath + "/media/logo_trasparente.png"} alt="BiSmart Logo" width={62} height={50} />
              <h1 className="fs-3 fw-bold text-white mb-0 d-inline-block ms-3">bismart.ai</h1>
            </div>
          </Link>
          
          {isMobile ? (
            // Versione Mobile: solo il bottone toggle
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
          ) : (
            // Versione Desktop: NavDropdown e Nav.Link
            <Nav className="ms-auto d-flex align-items-center gap-3"> {/* Reimportato Nav */}
              {!minimal && (
                <NavDropdown // Reimportato NavDropdown
                  title="Applicazioni"
                  id="applications-dropdown"
                  menuVariant="dark"
                  className=""
                >
                  {applications // Reimportato applications
                    .filter(app => !app.isHome)
                    .map((app) => (
                      <NavDropdown.Item
                        key={app.path}
                        as={Link}
                        href={`/${app.path}`}
                        passHref
                        active={router.asPath === `/${app.path}`}
                      >
                        {app.heroContent.brand}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              )}
              {!minimal && (
                <Nav.Link href="#prezzi" className="color-text-gold-light" style={{ pointerEvents: 'none' }}>Informazioni</Nav.Link>
              )}
              <Link href="/" passHref legacyBehavior>
                <a className="btn-login">Accedi</a>
              </Link>
            </Nav>
          )}
        </Container>
      </nav>

      {/* Renderizzazione condizionale dell'Overlay, mostrato solo se mobile e aperto */}
      {isMobile && isMenuOpen && <MenuOverlay closeMenu={toggleMenu} />}
    </>
  );
};

export default NewNavbar;