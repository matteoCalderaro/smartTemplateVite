import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css'; // Import animate.css
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useEffect, createRef } from 'react'; // Import useEffect and createRef

import NewNavbar from '../components/NewNavbar'; // Import the new Navbar component
import ScrollToTopButton from '../components/ScrollToTopButton';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Importa il nuovo hook
import useMediaQuery from '../hooks/useMediaQuery'; // Importa useMediaQuery

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const nodeRef = createRef(null);
  const isMobile = useMediaQuery(767); // Rileva se è mobile (meno di 768px)

  useSmoothScroll(); // Attiva l'hook per lo scorrimento fluido

  useEffect(() => {
    // Scroll to top on every page load/refresh
    window.scrollTo(0, 0);
  }, [router.asPath]); // Re-scroll whenever the route changes

  // Effect to set scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []); // Empty dependency array means it runs once on mount

  // Gestisce la classe 'no-page-transition' sul tag <html>
  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.add('no-page-transition');
    } else {
      document.documentElement.classList.remove('no-page-transition');
    }
    // Cleanup: assicurati che la classe venga rimossa se isMobile cambia mentre il componente è montato
    return () => {
      document.documentElement.classList.remove('no-page-transition');
    };
  }, [isMobile]); // Dipende da isMobile

  return (
    <>
      <NewNavbar minimal={router.pathname === '/thank-you'} />
      <ScrollToTopButton />
      <TransitionGroup component="div" className="transition-wrapper">
        <CSSTransition
          key={router.asPath}
          nodeRef={nodeRef}
          timeout={800} // Timeout sempre a 1000ms (durata CSS), la disabilitazione è via CSS
          classNames="page-transition"
          //onEnter={() => window.scrollTo(0, 0)}
        >
          <div ref={nodeRef} className={`page-content-wrapper ${router.pathname === '/thank-you' ? 'thank-you-page-layout' : ''}`}>
            <Component {...pageProps} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default MyApp;
