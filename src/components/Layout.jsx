import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ToTopButton from './ToTopButton';

function Layout({ children }) {
  const [showHeader, setShowHeader] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="layout">
      <Header visible={showHeader} />
      <main>
        {children}
      </main>
      <Footer />
      <ToTopButton />
    </div>
  );
}

export default Layout;
