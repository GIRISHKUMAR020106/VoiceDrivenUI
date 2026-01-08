import { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Default to Dark Mode if no preference
    const isDark = localStorage.getItem('theme') !== 'light'; 
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header style={{ 
      gridColumn: '1 / -1', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '20px',
      padding: '0 10px'
    }}>
      <div>
        <h1 style={{ 
          margin: 0, 
          fontSize: '2.4rem', 
          fontWeight: '900',
          background: 'linear-gradient(to right, #818cf8, #c084fc)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 10px rgba(129, 140, 248, 0.3))'
        }}>
          Finance AI
        </h1>
        <p style={{ margin: '5px 0 0', opacity: 0.7, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Next-Gen Voice Budgeting</p>
      </div>

      <button 
        onClick={toggleTheme}
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          border: '1px solid rgba(255, 255, 255, 0.15)', 
          padding: '10px 20px', 
          borderRadius: '50px',
          color: 'var(--text-main)',
          backdropFilter: 'blur(10px)',
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          fontSize: '0.9rem',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
}