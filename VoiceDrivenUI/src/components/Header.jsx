import { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark' || (!storedTheme && true);
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
    <header style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div>
        <h1 style={{ 
          fontSize: '2.5rem', fontWeight: '900', margin: 0,
          background: 'linear-gradient(to right, #818cf8, #c084fc)', 
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 10px rgba(129, 140, 248, 0.2))'
        }}>
          VoxFin – A Voice-Driven Finance Assistant
        </h1>
        <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Next-Generation Voice Budgeting</p>
      </div>

      <button onClick={toggleTheme} style={{
        background: 'var(--glass-highlight)', border: 'var(--glass-border)',
        padding: '10px 20px', borderRadius: '50px', color: 'var(--text-main)',
        backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}