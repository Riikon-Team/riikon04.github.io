import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  useEffect(() => {
    const updateTheme = () => {
      const body = document.body;
      body.classList.remove('dark-theme', 'light-theme');

      let currentTheme = theme;
      if (theme === 'system') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      // Add the theme class
      body.classList.add(`${currentTheme}-theme`);
      
      // Update CSS variables based on theme
      const root = document.documentElement;
      if (currentTheme === 'dark') {
        root.style.setProperty('--bg-color', 'var(--dark-bg)');
        root.style.setProperty('--bg-color-secondary', 'var(--dark-bg-secondary)');
        root.style.setProperty('--text-color', 'var(--dark-text)');
        root.style.setProperty('--text-color-secondary', 'var(--dark-text-secondary)');
        root.style.setProperty('--border-color', 'var(--dark-border)');
        root.style.setProperty('--card-bg', 'var(--dark-bg-secondary)');
      } else {
        root.style.setProperty('--bg-color', 'var(--light-bg)');
        root.style.setProperty('--bg-color-secondary', 'var(--light-bg-secondary)');
        root.style.setProperty('--text-color', 'var(--light-text)');
        root.style.setProperty('--text-color-secondary', 'var(--light-text-secondary)');
        root.style.setProperty('--border-color', 'var(--light-border)');
        root.style.setProperty('--card-bg', 'var(--light-bg-secondary)');
      }
      
      localStorage.setItem('theme', theme);
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') updateTheme();
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
