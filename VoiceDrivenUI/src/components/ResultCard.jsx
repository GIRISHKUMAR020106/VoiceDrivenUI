export default function ResultCard({ result }) {
  // --- EMPTY STATE: Shows Guide + Waiting Box ---
  if (!result) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        {/* 1. Guide Box */}
        <div className="card float-anim" style={{ flex: 1 }}>
          <h3>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            How to Use
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '2', fontSize: '1rem', marginTop: '20px' }}>
            <li><strong>Type:</strong> "Set food budget 5000"</li>
            <li><strong>Speak:</strong> "Spent 200 on Coffee"</li>
            <li><strong>Ask:</strong> "What is my balance?"</li>
          </ul>
        </div>

        {/* 2. Waiting Box (Now closer and part of the left layout) */}
        <div className="card" style={{ 
          padding: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
            Waiting for command...
          </div>
        </div>
      </div>
    );
  }

  // --- RESULT STATE ---
  return (
    <div className="card float-anim" style={{ borderTop: '4px solid var(--accent)', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Analysis</h3>
        <span style={{
          background: 'rgba(129, 140, 248, 0.1)',
          color: 'var(--primary)',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          border: '1px solid rgba(129, 140, 248, 0.2)'
        }}>
          {result.intent || 'Success'}
        </span>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '16px', padding: '24px' }}>
        {result.data && Object.entries(result.data).map(([key, value]) => (
          <div key={key} className="result-row">
            <span className="result-label">{key}</span>
            <span className="result-value">{value.toString()}</span>
          </div>
        ))}
        {result.message && !result.data && <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>{result.message}</p>}
      </div>
    </div>
  );
}