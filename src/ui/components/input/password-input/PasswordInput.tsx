import type { InputProps } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Input from "../Input";

const PasswordInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      label="Password"
      variant="flat"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff className="text-default-400 pointer-events-none text-2xl" />
          ) : (
            <Eye className="text-default-400 pointer-events-none text-2xl" />
          )}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
