import getUserById from "@/services/user/getUserById.service";
import { ROLE_COLOR, USER_ROLE } from "@/shared/constants/enums";
import Avatar from "@/ui/components/avatar/Avatar";
import Chip from "@/ui/components/chip/Chip";
import Skeleton from "@/ui/components/skeleton/Skeleton";
import {
  TypographyH4,
  TypographyMuted
} from "@/ui/components/typography/Typography";
import { Card } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userID } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["user-details", userID],
    queryFn: () => getUserById(parseInt(userID!)),
    enabled: Boolean(userID)
  });

  return (
    <Card className="mx-auto flex w-1/2 flex-row justify-between p-6">
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <Skeleton className="mt-1 h-6 w-60 rounded-md" />
        ) : (
          <TypographyH4 className="flex flex-row items-center gap-1">
            {data?.first_name} {data?.last_name}{" "}
            <Chip
              color={ROLE_COLOR[USER_ROLE[data?.role]]}
              size="sm"
              variant="bordered"
            >
              {USER_ROLE[data?.role]}
            </Chip>
          </TypographyH4>
        )}

        {isLoading ? (
          <Skeleton className="mt-1 h-4 w-60 rounded-md" />
        ) : (
          <TypographyMuted>Contact no: {data?.contact_no}</TypographyMuted>
        )}

        {isLoading ? (
          <Skeleton className="mt-1 h-4 w-60 rounded-md" />
        ) : (
          <TypographyMuted>Email: {data?.email}</TypographyMuted>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="h-14 w-14 rounded-full" />
      ) : (
        <Avatar
          src={data?.user_image}
          name={`${data?.first_name} ${data?.last_name}`}
          size="lg"
        />
      )}
    </Card>
  );
};

export default UserDetails;
