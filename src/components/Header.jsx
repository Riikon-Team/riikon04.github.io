import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

function Header({ visible = true }) {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className={`header ${visible ? 'visible' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Riikon Team Logo" style={{ height: '40px', marginRight: '10px' }} />
        </Link>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </nav>
        <div className="theme-toggle">
          <button 
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', color: 'inherit' }}
            onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
          >
            {theme === 'light' && <i className="bi bi-sun"></i>}
            {theme === 'dark' && <i className="bi bi-moon"></i>}
            {theme === 'system' && <i className="bi bi-gear"></i>}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
