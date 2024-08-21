import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let navbarClasses = ['navbar', 'navbar-expand-md', 'navbar-dark', 'fixed-top'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }
  return (
    <div>
      <nav className={navbarClasses.join(' ')}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src='/logo192.png' width={40} style={{ marginRight: '8px', marginTop: '-10px' }} />
            <strong>Vid</strong>Flix</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainnavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainnavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/popular" className="nav-link" style={{ color: 'white', marginRight: '1rem' }}>Popular</Link>
              </li>
              <li className="nav-item">
                <Link to="/top-rated" className="nav-link" style={{ color: 'white', marginRight: '1rem' }}>Top Rated</Link>
              </li>
            </ul>
            <SearchForm />
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;