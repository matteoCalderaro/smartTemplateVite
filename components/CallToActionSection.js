import React from 'react';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section id="cta-section" className="section-padding-bottom text-center">
      <div className="container">
        <h2 className="fw-bolder color-text-gold-light">Pronto a vedere BiSmart in azione?</h2>
        <p className="fs-5 text-white mt-3 mb-4">
          Il nostro team è pronto a mostrarti come la nostra suite può aiutarti a raggiungere i tuoi obiettivi!
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <a href="/demo" className="hero-cta-button fw-semibold rounded-4">
            <span className="hero-cta-button__content">Contattaci per una demo!</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;
