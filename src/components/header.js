import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle,  FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from './images/logo.jpg';

function dynamicCurrentMenuClass(selector, currentPath) {
  const listItems = selector.querySelectorAll('li');

  listItems.forEach((li) => {
    const anchor = li.querySelector('a');
    if (anchor) {
      // Compare the current path directly
      const anchorPath = anchor.getAttribute('href');
      if (anchorPath === currentPath) {
        li.classList.add('current');
      } else {
        li.classList.remove('current');
      }
    }
  });
}

const Header = () => {
  const location = useLocation();
  const agent = localStorage.getItem('agent'); // Get the token from local storage

  const handleLogOut = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    window.location.href = '/login'; // Redirect to the login page
  }

  useEffect(() => {
    const mainNavUL = document.querySelector('.current-menu');
    if (mainNavUL) {
      dynamicCurrentMenuClass(mainNavUL, location.pathname);
    }
  }, [location]);

  return (
    <header>
      <div className='header-wrapper'>
        <div className="logo">
          <div className="logo-box">
            <Link to="/"><img src={logo} alt="Logo" /></Link>
          </div>
        </div>
        <nav>
          <ul className="current-menu">
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/remarks-details"><FaInfoCircle /> Remarks</Link></li>
            <li onClick={() => handleLogOut()}><Link to="/"><FaSignOutAlt /> Log Off</Link></li>
            <li><Link to="/profile"><FaUser /> {agent || 'Prince Vijaykumar tes'}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
