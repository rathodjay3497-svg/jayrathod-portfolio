export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none neural-grid"
      aria-hidden="true"
      style={{
        backgroundSize: "40px 40px",
      }}
    />
  );
}
