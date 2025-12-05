import Link from 'next/link'; // Import Link
import React from 'react';

const Strengths = ({ content, clickableCards = false }) => { // Add clickableCards prop with default false
  return (
    <section id="strengths" className="section-padding-bottom">
      <div className="container">
        <div className="mb-3 mb-md-4 text-center text-white">
          <h2 className="fw-semibold color-text-gold-light">{content.title}</h2>
        </div>
        <div className="cards-grid">
          {content.cards.map((card, index) => (
            <div key={index}>
              {clickableCards && card.path ? ( // Conditionally render Link if clickableCards is true and path exists
                <Link href={`/${card.path}`} passHref legacyBehavior>
                  <a className="card h-100 strength-card-link"> {/* Add a class for styling the clickable card */}
                    <div className="card__base p-4 text-center text-white h-100">
                      <i className={`bi ${card.icon} d-block color-text-gold`} aria-hidden="true"></i>
                      <h4 className="mb-3 color-text-gold-light">{card.title}</h4>
                      <p className="mb-0">{card.description}</p>
                    </div>
                  </a>
                </Link>
              ) : ( // Otherwise render as non-clickable div
                <div className="card h-100">
                  <div className="card__base p-4 text-center text-white h-100">
                    <i className={`bi ${card.icon} mb-3 d-block color-text-gold`} aria-hidden="true"></i>
                    <h4 className="mb-3 color-text-gold-light">{card.title}</h4>
                    <p className="mb-0">{card.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strengths;
