import React from 'react';
import './ContactSection.css';

function ContactSection() {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-image">
          <img src="https://i.imgflip.com/4zolwc.gif" alt="Contact character" />
        </div>
        
        <div className="contact-platforms">
          <div className="platform">
            <div className="platform-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <div className="platform-info">
              <h3>Email</h3>
              <p>riikon04@gmail.com</p>
            </div>
          </div>
          
          <div className="platform">
            <div className="platform-icon">
              <i className="bi bi-discord"></i>
            </div>
            <div className="platform-info">
              <h3>Discord</h3>
              <p>Riikon Team</p>
            </div>
          </div>
          
          <div className="platform">
            <div className="platform-icon">
              <i className="bi bi-github"></i>
            </div>
            <div className="platform-info">
              <h3>GitHub</h3>
              <p>@RiikonTeam</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="social-links">
        <a href="mailto:riikon04@gmail.com" aria-label="Email">
          <i className="bi bi-envelope-fill"></i>
        </a>
        <a href="https://www.facebook.com/riikon04/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="bi bi-facebook"></i>
        </a>
        {/* <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="bi bi-linkedin"></i>
        </a> */}
        <a href="https://github.com/Riikon-Team" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://youtu.be/dQw4w9WgXcQ?si=5KEauDsXGSXx7xLX" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <i className="bi bi-discord"></i>
        </a>
      </div>
    </div>
  );
}

export default ContactSection;
