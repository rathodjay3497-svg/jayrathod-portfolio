interface TimelineNodeProps {
  isCurrent?: boolean;
}

export default function TimelineNode({ isCurrent = false }: TimelineNodeProps) {
  return (
    <div
      className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
        isCurrent
          ? "bg-primary-fixed-dim border-primary shadow-node-current"
          : "bg-outline-variant border-surface-container-low"
      }`}
    />
  );
}
