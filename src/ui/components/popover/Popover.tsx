import { cn } from "@/lib/utils";
import {
  Popover as HeroUIPopover,
  PopoverContent,
  PopoverTrigger,
  type PopoverProps as HeroUIPopoverProps
} from "@heroui/react";
import type { ReactNode } from "react";

interface PopoverProps extends Omit<HeroUIPopoverProps, "children"> {
  triggerElement: ReactNode;
  children: ReactNode | HTMLElement;
}

const Popover = (props: PopoverProps) => {
  const { children, triggerElement, className, ...restProps } = props;

  return (
    <HeroUIPopover {...restProps} className={cn(className)}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>

      <PopoverContent>{children}</PopoverContent>
    </HeroUIPopover>
  );
};

export default Popover;
