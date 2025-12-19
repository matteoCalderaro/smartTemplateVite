import React from 'react';
import { useRouter } from 'next/router';
import applications from '../data/applications';

const MenuOverlay = ({ closeMenu, isMenuOpen }) => { // Riceve isMenuOpen
  const router = useRouter();

  return (
    <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`}> {/* Applica classe is-open */}
      <h6>APPLICAZIONI</h6>
      <ul className="list-unstyled w-100">
        {applications
          .filter(app => !app.isHome)
          .map((app) => (
            <li
              key={app.path}
              className={`${router.asPath === `/${app.path}` ? 'active' : ''}`}
              onClick={() => {
                closeMenu();
                router.push(`/${app.path}`);
              }}
              style={{ cursor: 'pointer' }} // Aggiungiamo uno stile per indicare che è cliccabile
            >
              {app.heroContent.brand}
            </li>
          ))}
      </ul>
      <div className="mt-4">
        <button 
          className="btn btn-primary w-100"
          onClick={() => {
            closeMenu();
            router.push('/demo');
          }}
        >
          Richiedi Demo
        </button>
      </div>
    </div>
  );
};

export default MenuOverlay;