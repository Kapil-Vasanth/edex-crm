import React from 'react';
import logoLaptop  from './images/black NZ laptop.png'
import logoMobile  from './images/black NZ mobile.png'

function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year
  
    return (
      <footer>
            <div className="copywrite">
              <p className="cp_y">
                © {currentYear} Edex Academy. All Rights Reserved |{' '}
                <a href="https://www.designshore.co.nz/" target="_blank" rel="noopener noreferrer">
                  <img src={logoLaptop} alt="Designshore technology" />
                </a>
              </p>
              <p className="cp_ys">
                <a href="https://www.designshore.co.nz/" target="_blank" rel="noopener noreferrer">
                  <img src={logoMobile} alt="Designshore technology" />
                </a>
              </p>
            </div>
      </footer>
    );
  }

export default Footer;
