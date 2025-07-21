import { User as HeroUIUser, type UserProps } from "@heroui/react";

const User = (props: UserProps) => {
  return (
    <HeroUIUser
      {...props}
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
