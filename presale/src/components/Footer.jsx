import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';

const Footer = ({homeDetails}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6">
          {/* Logo and Copyright */}
          <div className="flex items-center md:items-start">
            <div>
              <Link to="/#home" className="flex items-center mb-4">
              
                <img src={homeDetails?.homeDetails?.TokenImage} alt="iToken Logo" className="h-8 w-8 mr-2" />
                <span className="text-white text-2xl font-medium">{homeDetails?.homeDetails?.TokenName}</span>
              </Link>
            </div>
          </div>
          
          {/* Navigation Links - Column 1 */}
          <div>
            <nav className="flex flex-col space-y-4">
              <Link to={`/#home`} smooth className="hover:text-white transition-colors">Home</Link>
              <Link to={`/#price`} smooth className="hover:text-white transition-colors">Price</Link>
              <Link to={`/#tokenomics`} smooth className="hover:text-white transition-colors">Tokenomics</Link>
              <Link to={`/#price-pool`} smooth className="hover:text-white transition-colors">Prize Pool</Link>
              <Link to={`/contact`} smooth className="hover:text-white transition-colors">Contact Us</Link>
              <Link to={`/#faq`} smooth className="hover:text-white transition-colors">FAQ</Link>
            </nav>
          </div>
          
          {/* Navigation Links - Column 2 */}
          <div>
            <nav className="flex flex-col space-y-4">
              <Link to="/dashboard" smooth className="hover:text-white transition-colors">Dashboard</Link>
              <Link to="/login"  smooth className="hover:text-white transition-colors">Log in</Link>
              <Link to="/register" smooth className="hover:text-white transition-colors">Register</Link>
            </nav>
          </div>
          
          {/* Empty column for spacing */}
          <div className="hidden lg:block"></div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800"></div>
        
        {/* Copyright */}
        <div className="py-6 px-6">
          <p>© {currentYear} {homeDetails?.homeDetails?.TokenName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


