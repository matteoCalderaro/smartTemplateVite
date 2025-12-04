import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css'; // Import animate.css
import '../styles/globals.scss';

import Navbar from '../components/Navbar'; // Import the ReadyNavbar component

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar /> {/* Render the ReadyNavbar */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

