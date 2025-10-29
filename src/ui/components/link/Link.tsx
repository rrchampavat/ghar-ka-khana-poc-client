import { cn } from "@/lib/utils";
import { Link as NextUILink, type LinkProps } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const Link = (props: LinkProps) => {
  const navigate = useNavigate();

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

  const handleNavigation = (e: React.MouseEvent) => {
    // Call the original onClick if provided
    onClick?.(e as any);

    // If it's an external link, download, target="_blank", or default behavior is prevented, let it handle normally
    if (
      isExternal ||
      download ||
      target === "_blank" ||
      e.defaultPrevented ||
      href.startsWith("http") ||
      href.startsWith("//")
    ) {
      return;
    }

    // For internal navigation, prevent default and use React Router
    if (href && !isDisabled) {
      e.preventDefault();
      navigate(href);
    }
  };

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
      onClick={handleNavigation}
      className={cn(className)}
      {...restProps}
    >
      {children}
    </NextUILink>
  );
};

export default Link;
