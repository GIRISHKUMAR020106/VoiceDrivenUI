import { useState } from "react";
// FIX: Using "../" to go up one level from 'pages' to 'components'
import Header from "../components/Header";
import VoiceInput from "../components/VoiceInput";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <Header />
      
      {/* LEFT COLUMN: ResultCard (Contains Guide + Waiting Box)
        RIGHT COLUMN: VoiceInput (Stretches to match height)
      */}
      <ResultCard result={result} />
      <VoiceInput onResult={setResult} />
    </div>
  );
}