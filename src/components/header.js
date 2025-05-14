import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome,  FaSignOutAlt, FaUser } from 'react-icons/fa';
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
  const student = localStorage.getItem('student'); // Get the token from local storage
  const role = localStorage.getItem('role'); // Get the token from local storage
  const token = localStorage.getItem('authToken'); // Get the token from local storage

  const handleLogOut = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    if(role === 'student') {
      window.location.href = '/student-login'; // Redirect to the student login page
    } else {
      window.location.href = '/login'; // Redirect to the login page
    }
  }

  const handleHomeClick = () => {
    if(role === 'student') {
      window.location.href = '/student-login'; // Redirect to the student dashboard
    } else {
      window.location.href = '/'; // Redirect to the home page
    }
  }

  useEffect(() => {
    const mainNavUL = document.querySelector('.current-menu');
    if (mainNavUL) {
      dynamicCurrentMenuClass(mainNavUL, location.pathname);
    }
  }, [location]);

  if(!token) {
    return null; // Don't render the header if the token exists
  }

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
            {agent && <li onClick={handleHomeClick}><FaHome /> Home</li>}
            {/* <li><Link to="/remarks-details"><FaInfoCircle /> Remarks</Link></li> */}
            <li onClick={() => handleLogOut()}><FaSignOutAlt /> Log Out</li>
            <li><FaUser /> {agent || student || 'Anonymous'}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
