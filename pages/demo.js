import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Import components
import Form from '../components/Form';
import Footer from '../components/Footer';
import NewNavbar from '../components/NewNavbar'; // Assuming this is the main navbar

const DemoPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Richiedi una Demo - BiSmart</title>
        <meta name="description" content="Richiedi una demo personalizzata della suite BiSmart e scopri come possiamo aiutarti a trasformare il tuo business." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${router.basePath}/media/favicon.ico`} />
      </Head>

      <div id='demo-page'>
        {/* A simple, focused header for the demo page */}
        <header className="demo-page-header section-padding">
          <div className="container text-center">
              <h1 className="fw-semibold color-text-gold-light">Prenota la tua demo gratuita!</h1>
              <p className="fs-5 color-text-secondary color-text-gold-light">Compila il form qui sotto e ti ricontatteremo al più presto!</p>
          </div>
        </header>
        
        <main id="main-content">
          <Form />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DemoPage;
