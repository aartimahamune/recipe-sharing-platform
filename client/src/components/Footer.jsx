import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flavor-footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FlavorAtlas. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
