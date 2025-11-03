import Button from "@/ui/components/button/Button";
import {
  TypographyH1,
  TypographyH4
} from "@/ui/components/typography/Typography";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-3">
      <TypographyH1>500</TypographyH1>
      <TypographyH4>
        Oops! Something went wrong on our end. Please try again later.
      </TypographyH4>
      <Button className="w-fit" onPress={() => navigate("/")} variant="solid">
        Go Home
      </Button>
    </div>
  );
};

export default ServerError;
