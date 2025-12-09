import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Importa useRouter
import applications from '../data/applications'; // Importa l'oggetto applications

const MenuOverlay = ({ closeMenu }) => {
  const router = useRouter(); // Inizializza useRouter

  return (
    <div className="menu-overlay">
      <h2 className="mb-4">Menu</h2>
      <ul className="list-unstyled text-center">
        {applications
          .filter(app => !app.isHome) // Filtra le applicazioni che non sono la home page
          .map((app) => (
            <li key={app.path} className={`mb-3 ${router.asPath === `/${app.path}` ? 'active' : ''}`}>
              <Link href={`/${app.path}`} onClick={closeMenu}>
                {app.heroContent.brand}
              </Link>
            </li>
          ))}
        <li className={`mb-3 ${router.asPath === '#prezzi' ? 'active' : ''}`}> {/* Applica classe active al link "Informazioni" */}
          <Link href="#prezzi" onClick={closeMenu}>Informazioni</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuOverlay;