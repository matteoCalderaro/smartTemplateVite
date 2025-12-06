import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css'; // Import animate.css
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useEffect, createRef } from 'react'; // Import useEffect and createRef
import Script from 'next/script'; // Import Script from next/script

import Navbar from '../components/Navbar'; // Import the ReadyNavbar component
import ScrollToTopButton from '../components/ScrollToTopButton';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const nodeRef = createRef(null);

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

  return (
    <>
      <Navbar /> {/* Render the ReadyNavbar */}
      <ScrollToTopButton />
      <TransitionGroup component="div" className="transition-wrapper">
        <CSSTransition
          key={router.asPath}
          nodeRef={nodeRef}
          timeout={800}
          classNames="page-transition"
          //onEnter={() => window.scrollTo(0, 0)}
        >
          <div ref={nodeRef} className="page-content-wrapper">
            <Component {...pageProps} />
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Script src="/js/smooth-scroll.js" strategy="beforeInteractive" />
    </>
  );
}

export default MyApp;
