import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Panel = ({
  title,
  icon: Icon,
  className,
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: ReactNode;
}) => (
  <section className={cn("glass flex flex-col rounded-3xl p-5", className)}>
    <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/55">
      <Icon aria-hidden className="size-3.5" strokeWidth={2.25} />
      {title}
    </h2>
    {children}
  </section>
);

export default Panel;
