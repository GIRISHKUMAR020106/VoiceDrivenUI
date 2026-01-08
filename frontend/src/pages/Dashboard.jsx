import { useState } from "react";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>💰 Voice‑Driven Finance Assistant</h1>

      <VoiceInput onResult={setResult} />
      <ResultCard result={result} />
    </div>
  );
}
