import { cn } from "../../lib/utils";
const styles = {
  hero: "font-display font-medium tracking-tight",
  heading: "font-display font-medium tracking-tight",
  title: "font-display font-semibold",
  body: "font-body",
  eyebrow: "eyebrow font-body uppercase",
  caption: "font-body text-xs text-muted",
};
export function Typography({
  as: Tag = "p",
  variant = "body",
  className,
  ...props
}) {
  return <Tag className={cn(styles[variant], className)} {...props} />;
}
