import { useState, useRef } from "react";
import { sendTextCommand } from "../services/api";

export default function VoiceInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Mock Audio Handler
  const processAudio = async (blob) => {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        intent: "add_expense",
        data: { item: "Grocery", amount: "1200", currency: "INR" },
        message: "Expense logged."
      }), 1500);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      
      mediaRecorder.onstop = async () => {
        setLoading(true);
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        try {
          const res = await processAudio(blob);
          onResult(res);
        } catch (e) {
          setError("Audio failed");
        } finally {
          setLoading(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
      setError(null);
    } catch (err) {
      setError("Mic blocked");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleSendText = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await sendTextCommand(text);
      onResult(response);
      setText("");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* flex-col-stretch is crucial for the height matching */
    <div className="card flex-col-stretch float-anim" style={{ animationDelay: '1s' }}>
      
      <div style={{ marginBottom: 'auto' }}>
        <h3>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Command Center
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.6' }}>
          Enter a command or record voice note to update your finances instantly.
        </p>

        <div style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="e.g. 'Paid 400 for Lunch'" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            disabled={loading}
          />
          <button className="btn-primary" onClick={handleSendText} disabled={loading}>➜</button>
        </div>
      </div>

      <div style={{ position: 'relative', margin: '30px 0', textAlign: 'center' }}>
        <div style={{ borderTop: '1px solid var(--text-muted)', opacity: 0.2, position: 'absolute', width: '100%', top: '50%' }}></div>
        <span style={{ background: 'var(--card-bg)', padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.8rem', position: 'relative', borderRadius: '10px' }}>OR</span>
      </div>

      <button 
        className={`btn-mic ${recording ? 'recording' : ''}`}
        onClick={recording ? stopRecording : startRecording}
        disabled={loading}
      >
        {recording ? (
          <><span>⏹</span> Stop Recording</>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            Start Speaking
          </>
        )}
      </button>

      {error && <p style={{ color: '#ef4444', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}