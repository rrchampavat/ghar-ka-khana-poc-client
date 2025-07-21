import Button from "@/ui/components/button/Button";
import {
  TypographyH1,
  TypographyH4
} from "@/ui/components/typography/Typography";
import { useNavigate } from "react-router-dom";

const NotFoundImage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3">
      <TypographyH1>404</TypographyH1>
      <TypographyH4>
        Oops! The page you're looking for does not exist.
      </TypographyH4>
      <Button
        className="w-fit border-black bg-black text-white hover:!bg-black"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundImage;
