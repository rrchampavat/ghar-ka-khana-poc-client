import { cn } from "@/lib/utils";
import { Button as HeroUIButton, type ButtonProps } from "@heroui/react";

const Button = (props: ButtonProps) => {
  const {
    children,
    variant = "shadow",
    color = "primary",
    size = "md",
    radius = "sm",
    startContent,
    endContent,
    spinner,
    spinnerPlacement = "start",
    fullWidth: isFullWidth = false,
    isIconOnly = false,
    isDisabled = false,
    isLoading = false,
    disableRipple: isDisableRipple = false,
    disableAnimation: isDisableAnimation = false,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onKeyDown,
    onKeyUp,
    onClick,
    className,
    ...restProps
  } = props;

  return (
    <HeroUIButton
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      startContent={startContent}
      endContent={endContent}
      spinner={spinner}
      spinnerPlacement={spinnerPlacement}
      fullWidth={isFullWidth}
      isIconOnly={isIconOnly}
      isDisabled={isDisabled}
      isLoading={isLoading}
      disableRipple={isDisableRipple}
      disableAnimation={isDisableAnimation}
      className={cn(
        className,
        variant === "faded" ? "border border-gray-300 bg-transparent" : "",
        variant === "ghost"
          ? "data-[hover=true]:bg-foreground data-[hover=true]:text-background"
          : ""
      )}
      {...restProps}
      {...(onPress && { onPress })}
      {...(onPressStart && { onPressStart })}
      {...(onPressEnd && { onPressEnd })}
      {...(onPressChange && { onPressChange })}
      {...(onPressUp && { onPressUp })}
      {...(onKeyDown && { onKeyDown })}
      {...(onKeyUp && { onKeyUp })}
      {...(onClick && { onClick })}
    >
      {children}
    </HeroUIButton>
  );
};

export default Button;
