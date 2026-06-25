import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import './styles/theme.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme-mode') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="app-wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HomePage />
      </main>
    </div>
  );
};

export default App;