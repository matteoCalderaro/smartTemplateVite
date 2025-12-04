import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const ThankYou = () => {
  return (
    <>
      <Head>
        <title>BiSmart - Richiesta Inviata con Successo!</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Navbar minimal={true} />

      <div className="thank-you-page color-bg-primary"> {/* Keep this div for the styling */}
        <div className="page-content-wrapper d-flex flex-column align-items-center">
            <div className="container text-center py-5 my-auto">
                <h1 className="display-3 fw-bolder mb-3 text-white text-shadow-effect">Grazie!</h1>
                <p className="color-text-gold-light mx-auto mb-5 lead-custom-size">
                    La tua richiesta è stata ricevuta con successo! Il nostro team ti contatterà al più presto all'indirizzo email fornito.
                </p>
                <Link href="/" className="hero-button fw-semibold py-3 px-5 rounded-4">
                    <span className="hero-button__content">Torna alla Home</span>
                </Link>
            </div>
        </div>
      </div>

      {/* Custom Footer for Thank You Page */}
      <footer className="footer-custom text-center py-3">
        <div className="container text-white-50">
          <p className="mb-0">&copy; {new Date().getFullYear()} BiSmart. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </>
  );
};

export default ThankYou;
