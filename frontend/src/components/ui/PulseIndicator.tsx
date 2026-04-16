export default function PulseIndicator({ label = "Active AI Model: Deployment Ready" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-container" />
      </span>
      <span className="text-primary font-medium tracking-widest uppercase text-xs font-label">
        {label}
      </span>
    </div>
  );
}
