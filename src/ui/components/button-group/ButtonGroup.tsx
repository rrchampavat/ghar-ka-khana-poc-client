import { cn } from "@/lib/utils";
import {
  ButtonGroup as NextUIButtonGroup,
  type ButtonGroupProps
} from "@heroui/react";

const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    children,
    variant = "ghost",
    color = "default",
    size = "md",
    radius = "sm",
    fullWidth: isFullWidth = false,
    isDisabled = false,
    className,
    ...restProps
  } = props;
  return (
    <NextUIButtonGroup
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      fullWidth={isFullWidth}
      isDisabled={isDisabled}
      className={cn(className)}
      {...restProps}
    >
      {children}
    </NextUIButtonGroup>
  );
};

export default ButtonGroup;
