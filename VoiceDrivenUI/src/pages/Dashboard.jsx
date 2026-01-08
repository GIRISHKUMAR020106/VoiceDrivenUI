import { useState } from "react";
import Header from "../components/Header";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // Track if command is sent

  const handleResult = (data) => {
    setResult(data);
    setIsProcessing(false); // Stop "Command Received" state
    if (data) {
      setToast("✅ Command processed successfully!");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleStartProcessing = () => {
    setResult(null); // Clear old results
    setIsProcessing(true); // Show "Command Received"
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
      {toast && <div className="toast-notification">{toast}</div>}
      <Header />

      <div className="dashboard-grid fill-page" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', alignItems: 'stretch' }}>
        
        {/* LEFT COLUMN */}
        <div className="help-column" style={{ display: 'flex' }}>
          {!showHelp ? (
            <button className="big-help-btn" onClick={() => setShowHelp(true)} style={{ width: '100%', height: '100%' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>💡</div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>How to Use VoxFin</span>
              <p>Click to expand setup guide</p>
            </button>
          ) : (
            <div className="card guide-animation help-box" style={{ width: '100%', margin: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ margin: 0 }}>🚀 Getting Started</h2>
                <button className="close-link" onClick={() => setShowHelp(false)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>✕ Close Guide</button>
              </div>
              <div className="guide-list" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div className="guide-item large">
                  <span className="guide-icon">💰</span>
                  <div><strong>Set a Budget</strong><p>"Limit my food spending to 500"</p></div>
                </div>
                <div className="guide-item large">
                  <span className="guide-icon">💸</span>
                  <div><strong>Log Expense</strong><p>"Spent 15 on coffee today"</p></div>
                </div>
                <div className="guide-item large">
                  <span className="guide-icon">📊</span>
                  <div><strong>Check Status</strong><p>"How much is left in my budget?"</p></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="main-column" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ flex: 1 }}>
            <VoiceInput 
                onResult={handleResult} 
                onProcessStart={handleStartProcessing} // Pass trigger to Input
            />
          </div>
          
          <div className="result-area">
            {result ? (
              <ResultCard result={result} />
            ) : (
              <div className="card status" style={{ marginTop: '40px', padding: '70px', textAlign: 'center', opacity: isProcessing ? 1 : 0.5 }}>
                <span className={isProcessing ? "pulse-dot active" : "pulse-dot"}></span> 
                {isProcessing ? "📩 Command Received. Processing..." : "Waiting for command..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}