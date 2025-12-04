import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar as BSNavbar, Nav, NavDropdown, Container } from 'react-bootstrap'; // Renamed Navbar to BSNavbar to avoid conflict
import { useRouter } from 'next/router';
import useScrollToSection from '../hooks/useScrollToSection';
import applications from '../data/applications';

const SCROLL_THRESHOLD = 50;

const ReadyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BSNavbar
      expand="lg"
      id="navbar"
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} py-1`}
      data-bs-theme="dark" // Ensures dark dropdown menu variant
    >
      <Container>
        <Link className="d-flex align-items-center me-auto gap-3 text-decoration-none" href="/" passHref>
          <BSNavbar.Brand as="div"> {/* Use as="div" to wrap the Link and Image/h1 */}
            <Image src={router.basePath + "/media/logo_trasparente.png"} alt="BiSmart Logo" width={62} height={50} />
            <h1 className="fs-3 fw-bold text-white mb-0 d-inline-block ms-3">bismart.ai</h1>
          </BSNavbar.Brand>
        </Link>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3"> {/* Use ms-auto for right alignment */}
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
                    passHref // Required when using as={Link} with href
                    active={router.asPath === `/${app.path}`}
                  >
                    {app.heroContent.brand}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>

            <Nav.Link href="#prezzi" onClick={(e) => scrollToSection(e, '#prezzi')} className="color-text-gold-light">Prezzi</Nav.Link>
            <Nav.Link href="#documentazione" onClick={(e) => scrollToSection(e, '#documentazione')} className="color-text-gold-light">Documentazione</Nav.Link>
            <Link href="/demo.html" passHref>
              <Nav.Link as="button" className="btn btn-outline-secondary color-text-gold-light fw-semibold py-2 px-4 rounded-4 transition duration-300 color-btn-border">Accedi</Nav.Link>
            </Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default ReadyNavbar;