import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="color-bg-white py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="align-items-center align-items-md-start d-flex flex-column mb-3 mb-md-0 gap-1">
          <p className="mb-0 ">&copy; 2025 BiNetwork srl</p>
          <p className="mb-0 ">P.IVA 02238260224</p>
          <p className="mb-0 d-none">Sede legale: Via Monache 6 - 38062 Arco (TN)</p>
          <p className="mb-0 "><i className="bi bi-geo-alt-fill me-2"></i>TRENTO - MILANO - FIRENZE</p>
        </div>
        <div className="align-items-center align-items-md-start d-flex flex-column mb-3 mb-md-0 gap-1">
          <p className="mb-0 "><i className="bi bi-telephone-fill me-2"></i><a href="tel:+390292100118" className=" fw-semibold text-decoration-none">+39 0292100118</a></p>
          <p className="mb-0 "><i className="bi bi-globe me-2"></i><a href="https://www.binetwork.it" target="_blank" className=" fw-semibold text-decoration-none">binetwork.it</a></p>
          <p className="mb-0 "><i className="bi bi-envelope-fill me-2"></i><a href="mailto:info@binetwork.it" className=" fw-semibold text-decoration-none">info@binetwork.it</a></p>
        </div>
        <div className="d-flex gap-3">
          <a href="https://www.linkedin.com/company/bi-network-srl" target="_blank" className="footer__social-icon"><i className="bi bi-linkedin"></i></a>
          <a href="https://www.instagram.com/binetwork_srl/" className="footer__social-icon"><i className="bi bi-instagram"></i></a>
          <a href="https://www.facebook.com/BINETWORK.IT/" className="footer__social-icon"><i className="bi bi-facebook"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
