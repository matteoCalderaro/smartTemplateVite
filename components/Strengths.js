import React from 'react';

const defaultContent = {
  title: "Quattro motivi per non poterne più fare a meno!",
  cards: [
    {
      icon: "bi-lightning-charge-fill",
      title: "Accesso Immediato",
      description: "Accedi subito ai contenuti nascosti nelle conversazioni per non perdere nessuna opportunità!"
    },
    {
      icon: "bi-robot",
      title: "Automazione Intelligente",
      description: "Automatizza reportistica e classificazione delle interazioni per risparmiare tempo prezioso!"
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Migliora i Processi",
      description: "Ottimizza la gestione del customer feedback e dei processi di vendita grazie a dati concreti!"
    },
    {
      icon: "bi-lightbulb-fill",
      title: "Decisioni Basate sui Dati",
      description: "Prendi decisioni strategiche basate su insight reali e non su sensazioni!"
    }
  ]
};

const Strengths = ({ content = defaultContent }) => {
  return (
    <section className="scroll-threshold section-padding-bottom">
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
