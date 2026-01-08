import { useEffect, useState } from "react";
import Header from "../components/Header";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState("light");

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="container">
      {/* Theme Toggle */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
          className="secondary"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <Header />

      {/* How to Use */}
      <div className="card">
        <h3>🧠 How to Use</h3>
        <ul style={{ color: "var(--muted-text)" }}>
          <li>⌨️ Type a finance command</li>
          <li>↩️ Press Enter or click Send</li>
          <li>📊 View detected intent below</li>
        </ul>
        <p style={{ fontStyle: "italic", color: "var(--muted-text)" }}>
          Example: set food budget to 6000
        </p>
      </div>

      <VoiceInput onResult={setResult} />

      {result ? (
        <ResultCard result={result} />
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          Waiting for command…
        </div>
      )}
    </div>
  );
}
