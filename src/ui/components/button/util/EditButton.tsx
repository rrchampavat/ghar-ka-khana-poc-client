import type { PressEvent } from "@heroui/react";
import { PenLineIcon } from "lucide-react";
import Button from "../Button";

type EditButtonProps = {
  onPress: ((e: PressEvent) => void) | undefined;
};

const EditButton = (props: EditButtonProps) => {
  const { onPress } = props;

  return (
    // <Tooltip content="Edit" color="warning">
    <Button
      isIconOnly
      size="sm"
      color="warning"
      variant="faded"
      onPress={onPress}
    >
      <PenLineIcon size={20} />
    </Button>
    // </Tooltip>
  );
};

export default EditButton;
