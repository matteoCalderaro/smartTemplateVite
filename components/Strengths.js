import Link from 'next/link'; // Import Link

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
                      <i className={`bi ${card.icon} d-block color-text-gold card__icon`} aria-hidden="true"></i>
                      <div className="card__title mb-3 color-text-gold-light">{card.title}</div>
                      <div className="card__description mb-0">{card.description}</div>
                    </div>
                  </a>
                </Link>
              ) : ( // Otherwise render as non-clickable div
                <div className="card h-100">
                  <div className="card__base p-4 text-center text-white h-100">
                    <i className={`bi ${card.icon} d-block color-text-gold card__icon`} aria-hidden="true"></i>
                    <div className="card__title mb-3 color-text-gold-light">{card.title}</div>
                    <div className="card__description mb-0">{card.description}</div>
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
