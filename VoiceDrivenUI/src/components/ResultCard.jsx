export default function ResultCard({ result }) {
  // --- EMPTY STATE (Shows Guide + Waiting) ---
  if (!result) {
    return (
      <div className="flex-col-stretch" style={{ gap: '24px' }}>
        {/* Guide Box - Takes up available space */}
        <div className="card float" style={{ flex: 1, animationDelay: '1s' }}>
          <h3>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            How to Use
          </h3>
          <ul className="guide-list" style={{ marginTop: '20px' }}>
            <li><strong>Type:</strong> "Set food budget to 5000"</li>
            <li><strong>Speak:</strong> "I spent 200 on Coffee"</li>
            <li><strong>Ask:</strong> "What is my remaining balance?"</li>
          </ul>
        </div>

        {/* Waiting Box - Fixed Height */}
        <div className="card text-center" style={{ padding: '20px' }}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-muted)' }}>
             <span style={{ display: 'block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
             Waiting for command...
           </div>
        </div>
      </div>
    );
  }

  // --- RESULT STATE ---
  return (
    <div className="card float" style={{ borderTop: '4px solid var(--accent)', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h3>Analysis Result</h3>
        <span style={{
          background: 'rgba(129, 140, 248, 0.1)', color: 'var(--primary)',
          padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem',
          fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid rgba(129, 140, 248, 0.2)'
        }}>
          {result.intent || 'Success'}
        </span>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '16px', padding: '24px' }}>
        {result.data && Object.entries(result.data).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.9rem' }}>{key}</span>
            <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{value.toString()}</span>
          </div>
        ))}
        {result.message && !result.data && <p className="text-center" style={{ fontSize: '1.1rem' }}>{result.message}</p>}
      </div>
    </div>
  );
}