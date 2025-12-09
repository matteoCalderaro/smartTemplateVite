import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar as BSNavbar, Nav, NavDropdown, Container } from 'react-bootstrap'; // Renamed Navbar to BSNavbar to avoid conflict
import { useRouter } from 'next/router';
import applications from '../data/applications';
import useScrollPosition from '../hooks/useScrollPosition'; // Import the custom hook


const Navbar = ({ minimal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const scrollPosition = useScrollPosition(); // Get scroll position from custom hook

  useEffect(() => {
    setIsScrolled(scrollPosition > 0);
  }, [scrollPosition]);

  return (
    <BSNavbar
      expand="lg"
      id="navbar"
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} py-2`}
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
            {!minimal && (
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
            )}
            {!minimal && (
              <Nav.Link href="#prezzi" className="color-text-gold-light" style={{ pointerEvents: 'none' }}>Informazioni</Nav.Link>
            )}
            <Link href="/" passHref legacyBehavior>
              <a className="btn-login d-none">Accedi</a>
            </Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;