import { PenLineIcon } from "lucide-react";
import Button from "../Button";

const EditButton = () => {
  return (
    // <Tooltip content="Edit" color="warning">
    <Button isIconOnly size="sm" color="warning">
      <PenLineIcon size={20} />
    </Button>
    // </Tooltip>
  );
};

export default EditButton;
