import { cn } from "@/lib/utils";
import { Input as NextUIInput, type InputProps } from "@heroui/react";

const Input = (props: InputProps) => {
  const {
    type = "text",
    label,
    variant = "underlined",
    color = "default",
    size = "md",
    radius = "sm",
    value,
    defaultValue,
    placeholder,
    description,
    errorMessage,
    startContent,
    endContent,
    labelPlacement = "inside",
    fullWidth: isFullWidth = false,
    isClearable = false,
    onClear,
    isRequired = false,
    isReadOnly = false,
    isDisabled = false,
    isInvalid = Boolean(errorMessage),
    disableAnimation: shouldDisableAnimation = false,
    className,
    classNames,
    onChange,
    onValueChange,
    ...restProps
  } = props;

  return (
    <NextUIInput
      type={type}
      label={label}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      fullWidth={isFullWidth}
      isClearable={isClearable}
      onClear={onClear}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      disableAnimation={shouldDisableAnimation}
      className={cn(className)}
      onChange={onChange}
      onValueChange={onValueChange}
      classNames={classNames}
      {...restProps}
    />
  );
};

export default Input;
