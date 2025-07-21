import { cn } from "@/lib/utils";
import { Link as NextUILink, type LinkProps } from "@heroui/react";

const Link = (props: LinkProps) => {
  const {
    children,
    size = "md",
    color = "primary",
    underline = "hover",
    href = "",
    target = "_self",
    rel, // ? The relationship between the linked resource and the current page.
    download = false,
    ping, // ? A space-separated list of URLs to ping when the link is followed.
    referrerPolicy = "no-referrer", // ? How much of the referrer to send when following the link.
    isExternal = false,
    showAnchorIcon: shouldShowAnchorIcon = false,
    anchorIcon,
    isBlock = false,
    isDisabled = false,
    disableAnimation: shouldDisableAnimation = false,
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
    <NextUILink
      size={size}
      color={color}
      underline={underline}
      href={href}
      target={target}
      rel={rel}
      download={download}
      ping={ping}
      referrerPolicy={referrerPolicy}
      isExternal={isExternal}
      showAnchorIcon={shouldShowAnchorIcon}
      anchorIcon={anchorIcon}
      isBlock={isBlock}
      isDisabled={isDisabled}
      disableAnimation={shouldDisableAnimation}
      onPress={onPress}
      onPressStart={onPressStart}
      onPressEnd={onPressEnd}
      onPressChange={onPressChange}
      onPressUp={onPressUp}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onClick={onClick}
      className={cn(className)}
      {...restProps}
    >
      {children}
    </NextUILink>
  );
};

export default Link;
