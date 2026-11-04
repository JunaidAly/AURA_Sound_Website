import {
  ArrowUpRight,
  Plus,
  Minus,
  X,
  Pause,
  Play,
  Disc3,
  AudioLines,
  Circle,
  Sun,
  Contrast,
} from "lucide-react";
const icons = {
  arrow: ArrowUpRight,
  plus: Plus,
  minus: Minus,
  close: X,
  pause: Pause,
  play: Play,
  disc: Disc3,
  wave: AudioLines,
  circle: Circle,
  sun: Sun,
  contrast: Contrast,
};
export function Icon({ name, size = 18, label, ...props }) {
  const Component = icons[name];
  if (!Component) throw new Error("Unknown icon: " + name);
  return (
    <Component
      size={size}
      strokeWidth={1.6}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className="inline-block shrink-0 align-middle"
      {...props}
    />
  );
}
