import { useState } from "react";
import { sendVoiceText } from "../services/api";

export default function VoiceInput({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const result = await sendVoiceText(text);
      onResult(result);
    } catch (err) {
      alert("API error");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>🎙 Voice / Text Input</h3>

      <input
        type="text"
        placeholder="e.g. set food budget to 6000"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Processing..." : "Send"}
      </button>
    </div>
  );
}
