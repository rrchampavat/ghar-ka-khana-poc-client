import { cn } from "@/lib/utils";
import { Chip as HeroUIChip, type ChipProps } from "@heroui/react";

const Chip = (props: ChipProps) => {
  const { className } = props;

  return <HeroUIChip {...props} className={cn(className)} />;
};

export default Chip;
