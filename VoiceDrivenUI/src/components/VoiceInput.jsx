import { useState } from "react";
import { sendTextCommand } from "../services/api";

export default function VoiceInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await sendTextCommand(text);
      onResult(response);
    } catch (err) {
      setError("Failed to reach backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🎙️ Enter Command</h3>

      <input
        type="text"
        placeholder="set food budget to 6000"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Processing..." : "Send"}
      </button>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
}
