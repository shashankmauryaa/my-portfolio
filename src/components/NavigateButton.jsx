import React, { useState, useRef, useEffect } from 'react';

export default function NavigateButton({ onNavigate, currentPage }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const items = [
    { label: 'Home', page: 'hub' },
    { label: 'About Me', page: 'about' },
    { label: 'Projects', page: 'projects' },
    { label: 'Contact Me', page: 'contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (page) => {
    setOpen(false);
    if (page !== currentPage) {
      onNavigate(page);
    }
  };

  return (
    <div className="navigate-wrapper" ref={wrapperRef}>
      <button
        className="navigate-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
      >
        navigate
      </button>
      <div className={`navigate-dropdown ${open ? 'open' : ''}`} role="menu">
        {items.map((item) => (
          <button
            key={item.page}
            className="navigate-dropdown-item"
            onClick={() => handleSelect(item.page)}
            role="menuitem"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
