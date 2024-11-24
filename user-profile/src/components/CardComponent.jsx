import React from 'react';

const CardComponent = ({ title, text }) => {
  return (
    <div className="mb-4">
      <h5 className="mb-2">{title}</h5>
      <div
        className="card"
        style={{
          width: '18rem',
          minHeight: '10rem',
          backgroundColor: '#D9D9D9',
          position: 'relative',
        }}
      >
        <div className="card-body d-flex flex-column">
          <span>{text}</span>
          <button
            className="btn btn-sm"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              fontSize: '2rem',
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
