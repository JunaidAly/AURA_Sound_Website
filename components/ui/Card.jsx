import { cn } from "../../lib/utils";
export function Card({ as: Tag = "article", className, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-line bg-paper/60 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
