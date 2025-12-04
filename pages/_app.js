import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css'; // Import animate.css
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useEffect, createRef } from 'react'; // Import useEffect and createRef

import Navbar from '../components/Navbar'; // Import the ReadyNavbar component
import ScrollToTopButton from '../components/ScrollToTopButton';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const nodeRef = createRef(null);

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
    </>
  );
}

export default MyApp;
