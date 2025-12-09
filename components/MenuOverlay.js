import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import applications from '../data/applications';

const MenuOverlay = ({ closeMenu, isMenuOpen }) => { // Riceve isMenuOpen
  const router = useRouter();

  return (
    <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`}> {/* Applica classe is-open */}
      <ul className="list-unstyled text-center w-100">
        {applications
          .filter(app => !app.isHome)
          .map((app) => (
            <li key={app.path} className={`${router.asPath === `/${app.path}` ? 'active' : ''}`}>
              <Link href={`/${app.path}`} onClick={closeMenu}>
                {app.heroContent.brand}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuOverlay;