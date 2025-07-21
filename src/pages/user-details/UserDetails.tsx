import useLocalStorage from "@/hooks/useLocalStoage";
import { USER_ROLE } from "@/shared/constants/enums";
import Avatar from "@/ui/components/avatar/Avatar";
import {
  TypographyH4,
  TypographyMuted
} from "@/ui/components/typography/Typography";
import { Card } from "@heroui/react";

const UserDetails = () => {
  const [lclUser] = useLocalStorage("user");
  return (
    <Card className="mx-auto flex w-1/2 flex-row justify-between p-6">
      <div>
        <TypographyH4 className="flex flex-row items-center gap-1">
          {lclUser?.first_name} {lclUser?.last_name}{" "}
          <TypographyMuted>({USER_ROLE[lclUser?.role]})</TypographyMuted>
        </TypographyH4>

        <TypographyMuted>Contact no: {lclUser?.contact_no}</TypographyMuted>

        <TypographyMuted>Email: {lclUser?.email}</TypographyMuted>
      </div>

      <Avatar
        src={lclUser?.image_url}
        name={`${lclUser?.first_name} ${lclUser?.last_name}`}
        size="lg"
      />
    </Card>
  );
};

export default UserDetails;
