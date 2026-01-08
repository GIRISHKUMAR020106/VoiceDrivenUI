import { useState } from "react";
import Header from "../components/Header";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      {/* App Header */}
      <Header />

      {/* Instruction Card */}
      <div className="card" style={{ background: "#f8fafc" }}>
        <h3>🧠 How to Use</h3>
        <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#444" }}>
          <li>🎙️ Click <strong>Speak</strong> and say a finance command</li>
          <li>⌨️ Or type a command and press <strong>Enter</strong></li>
          <li>📊 View detected intent and system response below</li>
        </ul>

        <p style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
          Example: <code>set food budget to 6000</code>
        </p>
      </div>

      {/* Voice / Text Input */}
      <VoiceInput onResult={setResult} />

      {/* Result Output */}
      {result ? (
        <ResultCard result={result} />
      ) : (
        <div
          className="card"
          style={{ textAlign: "center", color: "#666" }}
        >
          <p>⏳ Waiting for a command…</p>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "14px",
          color: "#888",
        }}
      >
        <p>
          Built for <strong>Build2Break Hackathon</strong> · Voice-Driven FinTech
        </p>
      </footer>
    </div>
  );
}
