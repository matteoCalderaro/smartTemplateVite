import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter

const FounderMessage = () => {
  const router = useRouter(); // Initialize useRouter
  const basePath = router.basePath;

  return (
    <section id="founder-message" className="section-padding-bottom">
      <div className="container">
        <div className="card">
          <div className="card__base p-4 p-md-5">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-3 text-center mb-4 mb-md-0">
                <Image src={basePath + "/media/davide.jpg"} alt="Davide, Founder di BiSmart" className="img-fluid founder-message__img mx-auto d-block" width={150} height={150} />
              </div>
              <div className="col-12 col-md-9 founder-message__text text-white">
                <h3 className="fw-bolder mb-3 color-text-gold-light">Dalla complessità alla chiarezza: la mia visione per Voi...</h3>
                <blockquote className="founder-message__quote"><span style={{ width: '20px', display: 'inline-block' }}></span><span className="founder-message__quote--first-word">Ho</span> creato BiSmart per un motivo semplice: trasformare la nebbia dei dati che rallenta le aziende in chiarezza per agire. La nostra missione è darvi la visione per far volare il business, con decisioni più rapide e <span className="founder-message__quote--last-word">intelligenti.</span></blockquote>
                <div className="mt-4">
                  <p className="fw-semibold mb-1">Con visione, per il vostro successo,</p>
                  <p className="fw-bold mb-0">Davide Massari</p>
                  <p className="mb-0"><small>Founder di BiSmart</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
