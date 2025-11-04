import type { PressEvent } from "@heroui/react";
import { BanIcon } from "lucide-react";
import Button from "../Button";

type DeactivateButtonProps = {
  onPress: ((e: PressEvent) => void) | undefined;
};

const DeactivateButton = (props: DeactivateButtonProps) => {
  const { onPress } = props;

  return (
    // <Tooltip content="Deactivate" color="danger">
    <Button
      isIconOnly
      size="sm"
      color="danger"
      onPress={onPress}
      variant="faded"
    >
      <BanIcon />
    </Button>
    // </Tooltip>
  );
};

export default DeactivateButton;
