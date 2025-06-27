import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Our team is dedicated to creating amazing projects together.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/about-us">About Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/riikon04" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@riikonteam" className="social-link" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://youtu.be/dQw4w9WgXcQ" className="social-link" aria-label="Discord">
                <i className="bi bi-discord"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Team Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
