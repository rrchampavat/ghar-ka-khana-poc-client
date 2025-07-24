import { cn } from "@/lib/utils";
import { Tooltip as HeroUITooltip, type TooltipProps } from "@heroui/react";

const Tooltip = (props: TooltipProps) => {
  const { className } = props;

  return <HeroUITooltip {...props} className={cn(className)} />;
};

export default Tooltip;
