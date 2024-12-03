import { cn } from "@/lib/utils";

const ifSelectedStyle =
  "rounded-none border-b-2 border-b-black dark:border-b-white";

export const UnderlineOnSelection = ({
  isSelected,
  children,
  className,
}: {
  isSelected: () => boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn(className, isSelected() ? ifSelectedStyle : "")}>
    {children}
  </div>
);
