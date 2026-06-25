import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './styles/theme.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme-mode') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main style={{ height: '200vh', paddingTop: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', textAlign: 'center', maxWidth: '900px', fontWeight: 800 }}>
          The Future of <span style={{ color: 'var(--primary-color)' }}>File Sharing</span> is Here.
        </h1>
        <p style={{ color: 'var(--text-sub)', marginTop: '20px', fontSize: '1.2rem' }}>
          Minimalist. Fast. Connection-first.
        </p>
      </main>
    </div>
  );
};

export default App;