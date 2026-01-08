import { useState, useRef } from "react";
import { sendTextCommand } from "../services/api";

export default function VoiceInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Mock API for visual testing
  const processAudio = async (blob) => {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        intent: "add_expense",
        data: { item: "Netflix Subscription", amount: "650", currency: "INR" },
        message: "Expense logged successfully."
      }), 1200);
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
        } catch (e) { setError("Audio processing failed"); } 
        finally { setLoading(false); }
      };

      mediaRecorder.start();
      setRecording(true);
      setError(null);
    } catch (err) { setError("Microphone access denied"); }
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
    } catch (err) { setError("Server error"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="card flex-col-stretch float">
      <h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        Command Center
      </h3>
      
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
        Enter a command or record a voice note to manage your finances instantly.
      </p>

      <div className="input-wrapper">
        <input 
          type="text" placeholder="e.g., 'Paid 400 for Lunch'" 
          value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
          disabled={loading}
        />
        <button className="btn-primary" onClick={handleSendText} disabled={loading}>➜</button>
      </div>

      <div className="mt-auto">
        <div className="divider"><span>OR USE VOICE</span></div>
        <button 
          className={`btn-mic ${recording ? 'recording' : ''}`}
          onClick={recording ? stopRecording : startRecording}
          disabled={loading}
        >
          {recording ? '⏹ Stop Recording' : '🎙️ Start Speaking'}
        </button>
      </div>

      {error && <p style={{ color: 'var(--danger)', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}