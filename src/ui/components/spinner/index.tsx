import { cn } from "@/lib/utils";
import { type SpinnerProps, Spinner as NextUISpinner } from "@heroui/react";

const Spinner = (props: SpinnerProps) => {
  const {
    label,
    size = "md",
    color = "primary",
    labelColor = "foreground",
    className,
    classNames,
    ...restProps
  } = props;

  return (
    <NextUISpinner
      label={label}
      size={size}
      color={color}
      labelColor={labelColor}
      classNames={classNames}
      className={cn(className)}
      {...restProps}
    />
  );
};

export default Spinner;
