import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ICONS } from '../data/applications-home-page.js';

const { Box } = ICONS;

export const ApplicationCard = React.forwardRef(({ 
  app, 
  isSelected,
  isHovered,
  onClick,
  onNavigate,
  onMouseEnter,
  onMouseLeave
}, ref) => {
  const Icon = ICONS[app.iconName] || Box;

  const isActive = isSelected || isHovered;

  const handleQuickNavigate = (e) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div 
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`application-card position-relative p-4 rounded-4 border cursor-pointer ${isActive ? 'application-card--active' : ''}`}
    >
      <div className="d-flex gap-4">
        <div className="d-flex flex-column justify-content-between">
          <div className="application-card__icon flex-shrink-0 p-2 rounded-3">
            <Icon style={{width: '1.75rem', height: '1.75rem'}} />
          </div>
          <button
            onClick={handleQuickNavigate}
            title="Vai direttamente all'app"
            className="application-card__quick-nav btn p-2 rounded-3"
          >
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="flex-grow-1 min-w-0 d-flex flex-column">
          
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
            <h3 className="application-card__title fw-bold lh-tight" style={{fontSize: '1.125rem'}}>
              {app.name}
            </h3>

            <span className="application-card__category d-inline-flex align-items-center text-uppercase fw-bold px-2 py-1 rounded-pill border" style={{fontSize: '10px'}}>
                {app.category}
            </span>
          </div>

          <p className="application-card__description lh-base">
            {app.description}
          </p>
        </div>
      </div>
    </div>
  );
});

ApplicationCard.displayName = 'ApplicationCard';