import React from 'react';

const Header = () => {
  return (
    <header className="mb-4 d-flex align-items-center">
      <i
        className="bi bi-arrow-left"
        style={{
          fontSize: '1.5rem',
          marginRight: '10px',
          cursor: 'pointer',
        }}
      ></i>
      <img
        src="/img/logo.svg"
        alt="Trood Logo"
        style={{
          height: '30px',
          marginRight: '10px',
        }}
      />
      <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Profile</h1>
    </header>
  );
};

export default Header; 
