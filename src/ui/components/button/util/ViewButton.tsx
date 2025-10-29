import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

type ViewButtonProps = {
  href: string;
};

const ViewButton = (props: ViewButtonProps) => {
  const { href = "" } = props;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href);
  };

  return (
    // <Tooltip content="View" color="primary">
    <Button
      {...props}
      isIconOnly
      size="sm"
      color="primary"
      onPress={handleNavigate}
      variant="faded"
    >
      <SquareArrowOutUpRightIcon size={20} />
    </Button>
    // </Tooltip>
  );
};

export default ViewButton;
