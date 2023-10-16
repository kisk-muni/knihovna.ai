export function Fallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Něco se pokazilo:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
