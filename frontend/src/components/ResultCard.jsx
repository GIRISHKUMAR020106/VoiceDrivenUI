export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="card result">
      <h3>🧠 Result</h3>

      <p><strong>Intent:</strong> {result.intent}</p>

      {result.data && (
        <pre>{JSON.stringify(result.data, null, 2)}</pre>
      )}

      {!result.success && (
        <p style={{ color: "red" }}>{result.message}</p>
      )}
    </div>
  );
}
