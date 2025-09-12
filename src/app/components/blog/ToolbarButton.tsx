'use client';

interface ToolbarButtonProps {
  label: string;
  onClick: () => void;
}

export default function ToolbarButton({ label, onClick }: ToolbarButtonProps) {
  return (
    <button type="button" className="px-2 py-1 border rounded" onClick={onClick}>
      {label}
    </button>
  );
}
