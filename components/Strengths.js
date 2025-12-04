import React from 'react';

const Strengths = ({ content }) => {
  return (
    <section id="strengths" className="section-padding-bottom">
      <div className="container">
        <div className="mb-3 mb-md-4 text-center text-white">
          <h2 className="fw-bold color-text-gold-light">{content.title}</h2>
        </div>
        <div className="cards-grid">
          {content.cards.map((card, index) => (
            <div key={index}>
              <div className="card h-100">
                <div className="card__base p-4 text-center text-white h-100">
                  <i className={`bi ${card.icon} fs-1 mb-3 d-block color-text-gold`}></i>
                  <h4 className="fw-bold mb-2 color-text-gold-light">{card.title}</h4>
                  <p className="mb-0">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strengths;
