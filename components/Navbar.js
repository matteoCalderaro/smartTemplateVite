import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { NavDropdown } from 'react-bootstrap'; // Import NavDropdown
import { useRouter } from 'next/router'; // Import useRouter
import useScrollToSection from '../hooks/useScrollToSection'; // Import the hook
import applications from '../data/applications'; // Import applications data

const SCROLL_THRESHOLD = 50;

const Navbar = ({ minimal = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection(); // Use the hook
  const router = useRouter(); // Initialize useRouter

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
    <nav id="navbar" className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container py-1">
        <Link className="d-flex align-items-center me-auto gap-3 text-decoration-none" href="/"> {/* Removed onClick */}
            <Image src={router.basePath + "/media/logo_trasparente.png"} alt="BiSmart Logo" width={62} height={50}/>
          <h1 className="fs-3 fw-bold text-white mb-0 ">bismart.ai</h1>
        </Link>
        {!minimal && (
          <div className="d-flex align-items-center gap-3">
            {/* Applications Dropdown */}
            <NavDropdown
              title="Applicazioni"
              id="applications-dropdown"
              menuVariant="dark" // For dark background
              className="btn btn-outline-secondary color-text-gold-light fw-semibold py-2 px-4 rounded-4" // Apply button styling here
            >
              {applications
              .filter(app => !app.isHome) // Filter out the 'home' application
              .map((app) => (
                <NavDropdown.Item
                  as={Link}
                  href={`/${app.path}`}
                  key={app.path}
                  active={router.asPath === `/${app.path}`} // Apply active class if current path matches
                >
                  {app.heroContent.brand}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Other existing links */}
            <a href="#funzionalita" className="nav-link color-text-gold-light" onClick={(e) => scrollToSection(e, '#funzionalita')}>Funzionalità</a>
            <a href="#prezzi" className="nav-link color-text-gold-light" onClick={(e) => scrollToSection(e, '#prezzi')}>Prezzi</a>
            <a href="#documentazione" className="nav-link color-text-gold-light" onClick={(e) => scrollToSection(e, '#documentazione')}>Documentazione</a>
            <Link href="/demo.html" className="btn btn-outline-secondary color-text-gold-light fw-semibold py-2 px-4 rounded-4 transition duration-300 color-btn-border">Accedi</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;