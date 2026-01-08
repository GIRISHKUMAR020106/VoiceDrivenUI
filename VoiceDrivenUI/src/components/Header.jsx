import { useState, useEffect } from 'react';
import { UserButton } from "@clerk/clerk-react"; // Import the Clerk User Button

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
    <header style={{ 
      gridColumn: '1 / -1', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '10px' 
    }}>
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

      {/* Right-side actions: Theme Toggle + Clerk User Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={toggleTheme} style={{
          background: 'rgba(255, 255, 255, 0.1)', // Changed to standard rgba for fallback
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '10px 20px', 
          borderRadius: '50px', 
          color: 'var(--text-main)',
          backdropFilter: 'blur(10px)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          cursor: 'pointer'
        }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* User profile dropdown automatically handled by Clerk */}
        <UserButton afterSignOutUrl="/" /> 
      </div>
    </header>
  );
}