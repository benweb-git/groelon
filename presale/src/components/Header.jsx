import React, { useState } from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';

const Header = ({ homeDetails }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const {pathname}=useLocation
  //console.log(homeDetails)
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Header Navigation */}
      <header className="p-4 px-6 md:px-8 flex justify-between items-center relative z-30 text-white">
        <Link to="/#home" className="flex items-center">
          <img src={homeDetails?.homeDetails?.TokenImage} alt="iToken Logo" className="h-8 w-8" />
          <span className="ml-2 font-bold">{homeDetails?.homeDetails?.TokenName}</span>
        </Link>

        {/* Desktop Navigation */}
            {/* {
               pathname === '/' ?
            } */}
        <nav className="hidden md:flex space-x-6">  
          <Link to={`/#home`} smooth className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to={`/#price`} smooth className="hover:text-gray-300 transition-colors">Price</Link>
          <Link to={`/#tokenomics`} smooth className="hover:text-gray-300 transition-colors">Tokenomics</Link>
          <Link to={`/#price-pool`} smooth className="hover:text-gray-300 transition-colors">Prize Pool</Link>
          <Link to={`/contact`} smooth  className="hover:text-gray-300 transition-colors">Contact Us</Link>
          <Link to={`/#faq`} smooth  className="hover:text-gray-300 transition-colors">FAQ</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <Link to={`/login`} smooth  className=" block text-sm hover:text-gray-300 transition-colors">Log in</Link>
          <Link to={`/register`} smooth  className="block bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Register</Link>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 z-20 shadow-lg text-white">
          <nav className="flex flex-col p-4">
          <Link to={`/#home`} smooth className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to={`/#price`} smooth className="hover:text-gray-300 transition-colors">Price</Link>
          <Link to={`/#tokenomics`} smooth className="hover:text-gray-300 transition-colors">Tokenomics</Link>
          <Link to={`/#price-pool`} smooth className="hover:text-gray-300 transition-colors">Prize Pool</Link>
          <Link to={`/contact`} smooth  className="hover:text-gray-300 transition-colors">Contact Us</Link>
          <Link to={`/#faq`} smooth  className="hover:text-gray-300 transition-colors">FAQ</Link>
            <div className="flex space-x-3 mt-4">
              <Link to={`/login`} smooth className="block text-sm hover:text-gray-300 transition-colors">Log in</Link>
              <Link to={`/register`} smooth className="block bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Register</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;


