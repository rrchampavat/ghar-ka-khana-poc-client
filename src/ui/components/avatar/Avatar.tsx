import { Avatar as HeroAvatar, type AvatarProps } from "@heroui/react";

const Avatar = (props: AvatarProps) => {
  const {
    src,
    color = "default",
    radius = "full",
    size = "md",
    name,
    icon,
    fallback,
    isBordered = false,
    isDisabled = false,
    isFocusable = false,
    showFallback: shouldShowFallback = false,
    ImgComponent = "img",
    imgProps,
    className,
    ...restProps
  } = props;

  return (
    <HeroAvatar
      src={src}
      color={color}
      radius={radius}
      size={size}
      name={name}
      icon={icon}
      fallback={fallback}
      isBordered={isBordered}
      isDisabled={isDisabled}
      isFocusable={isFocusable}
      showFallback={shouldShowFallback}
      ImgComponent={ImgComponent}
      imgProps={imgProps}
      className={className}
      getInitials={(name) =>
        name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      }
      {...restProps}
    />
  );
};

export default Avatar;
