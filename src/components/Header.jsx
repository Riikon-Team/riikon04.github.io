import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

function Header({ visible }) {
  const { theme, setTheme } = useTheme();
  
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  
  return (
    <header className={`header ${visible ? 'visible' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">Team Logo</Link>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </nav>
        <div className="theme-selector">
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
