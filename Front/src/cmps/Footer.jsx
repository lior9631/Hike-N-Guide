import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yearToShow = currentYear === 2020 ? '2020' : `2020-${currentYear}`;
  return (
  <footer className="main-footer">
    <p className="main-footer-text">
  <span>&copy; { yearToShow } </span>
      <a className="main-footer-link" href="https://github.com/nguyaniv/Hike_N_Guide/graphs/contributors" target="_blank" rel="noopener noreferrer">Hike & Guide contributors.</a>
    </p>
  </footer>
  );
};
