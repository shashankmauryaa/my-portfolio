import React from 'react';

/**
 * Reusable game-panel card with pixel corner ornaments.
 * Matches the reference Behance pixel card aesthetic.
 */
export default function GameCard({ children, className = '', header, headerRight, mint = false, style }) {
  return (
    <div className={`game-card ${mint ? 'mint' : ''} ${className}`} style={style}>
      <span className="corner tl" aria-hidden="true" />
      <span className="corner tr" aria-hidden="true" />
      <span className="corner bl" aria-hidden="true" />
      <span className="corner br" aria-hidden="true" />
      {header && (
        <div className="card-header">
          <span>{header}</span>
          {headerRight || (
            <div className="card-dots">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
            </div>
          )}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
