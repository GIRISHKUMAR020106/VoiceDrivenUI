import { useState } from "react";
import Header from "../components/Header";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <Header />

      <VoiceInput onResult={setResult} />

      <ResultCard result={result} />
    </div>
  );
}
