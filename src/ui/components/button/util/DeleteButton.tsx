import { Trash2Icon } from "lucide-react";
import Button from "../Button";

const DeleteButton = () => {
  return (
    // <Tooltip content="Delete" color="danger">
    <Button isIconOnly size="sm" color="danger">
      <Trash2Icon size={20} />
    </Button>
    // </Tooltip>
  );
};

export default DeleteButton;
