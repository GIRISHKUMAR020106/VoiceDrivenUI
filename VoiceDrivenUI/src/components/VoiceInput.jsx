import { useState, useRef } from "react";
import api, { sendTextCommand } from "../services/api";
import convertWebMToWav from "./../utils/audio_converter";

export default function VoiceInput({ onResult, onProcessStart }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // -----------------------------
  // START RECORDING
  // -----------------------------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = handleAudioStop;

      mediaRecorder.start();
      setRecording(true);
      setError(null);
    } catch (err) {
      setError("Microphone access denied");
    }
  };

  // -----------------------------
  // STOP RECORDING
  // -----------------------------
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // -----------------------------
  // CONVERT TO WAV + SEND TO BACKEND
  // -----------------------------
  const handleAudioStop = async () => {
    // Notify Dashboard that processing has started
    if (onProcessStart) onProcessStart();
    setLoading(true);

    try {
      // Create WAV blob (browser-safe)
      const webmBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const wavBlob = await convertWebMToWav(webmBlob);

      const formData = new FormData();
      formData.append("file", wavBlob, "voice.wav");

      const response = await api.post("/voice/process", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Audio processing failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // TEXT COMMAND (Handles Input & Chips)
  // -----------------------------
  const handleSendText = async (manualText) => {
    const query = typeof manualText === "string" ? manualText : text;
    if (!query.trim()) return;

    // Notify Dashboard that processing has started
    if (onProcessStart) onProcessStart();
    setLoading(true);
    setError(null);

    try {
      const response = await sendTextCommand(query);
      onResult(response);
      setText(""); // Clear input on success
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex-col-stretch float">
      <h3>🎙️ Command Center</h3>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="e.g. Paid 40 for tea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendText()}
          disabled={loading}
        />
        <button onClick={() => handleSendText()} disabled={loading}>
          ➜
        </button>
      </div>

      {/* Suggestion Chips Section */}
      <div className="chips-container" style={{ marginTop: '12px' }}>
        <div className="chips-wrapper" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {["Check balance", "Spent 50 on fuel", "Show my budget"].map((cmd) => (
            <button 
              key={cmd} 
              className="chip" 
              onClick={() => handleSendText(cmd)} 
              disabled={loading}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" style={{ marginTop: '20px' }}>
        <span>OR USE VOICE</span>
      </div>

      <button
        className={`btn-mic ${recording ? "recording is-listening" : ""}`}
        onClick={recording ? stopRecording : startRecording}
        disabled={loading}
      >
        {recording ? "⏹ Stop Recording" : "🎙️ Start Speaking"}
      </button>

      {error && <p className="error" style={{ marginTop: '10px', color: '#ef4444' }}>{error}</p>}
    </div>
  );
}