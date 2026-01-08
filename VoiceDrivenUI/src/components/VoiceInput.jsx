import { useState, useRef } from "react";
import { sendTextCommand} from "../services/api";

export default function VoiceInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🎤 Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        setLoading(true);
        try {
          const response = awaitsendAudioCommand(audioBlob);
          onResult(response);
        } catch (err) {
          setError("Failed to process audio");
        } finally {
          setLoading(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      setError("Microphone access denied");
    }
  };

  // ⏹ Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  // ⌨ Text submit
  const handleSendText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await sendTextCommand(text);
      onResult(response);
      setText("");
    } catch (err) {
      setError("Failed to reach backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🎙️ Voice / Text Command</h3>

      <input
        type="text"
        placeholder="Type a finance command"
        value={text}
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendText()}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button onClick={handleSendText} disabled={loading}>
          Send Text
        </button>

        <button
          onClick={recording ? stopRecording : startRecording}
          style={{
            background: recording ? "#dc2626" : "#059669",
          }}
          disabled={loading}
        >
          {recording ? "⏹ Stop" : "🎤 Speak"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
