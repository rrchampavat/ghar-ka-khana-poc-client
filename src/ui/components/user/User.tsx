import { cn } from "@/lib/utils";
import { User as HeroUIUser, type UserProps } from "@heroui/react";

const User = (props: UserProps) => {
  const { className } = props;

  return (
    <HeroUIUser
      {...props}
      className={cn(className)}
      avatarProps={{
        ...props.avatarProps,
        getInitials: (name) =>
          name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
      }}
    />
  );
};

export default User;
