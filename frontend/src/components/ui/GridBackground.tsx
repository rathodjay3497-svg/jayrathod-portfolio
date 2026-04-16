export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(60,73,78,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(60,73,78,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}
