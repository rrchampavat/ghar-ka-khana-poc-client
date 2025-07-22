import getUsers from "@/services/user/getUsers";
import { USER_ROLE } from "@/shared/constants/enums";
import Avatar from "@/ui/components/avatar/Avatar";
import Table from "@/ui/components/table/Table";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-list"],
    queryFn: getUsers,
    select: (data) =>
      data.map((user) => ({
        key: user.id,
        name: (
          <div className="flex flex-row items-center gap-2">
            <Avatar
              src={user.user_image!}
              name={`${user.first_name} ${user.last_name}`}
            />
            {user.first_name} {user.last_name}
          </div>
        ),
        email: user.email,
        contact_no: user.contact_no,
        role: USER_ROLE[user.role]
      }))
  });

  return (
    <Table
      columns={[
        { key: "name", label: "Name", width: "28%" },
        { key: "email", label: "Email", width: "30%" },
        { key: "contact_no", label: "Contact No", width: "27%" },
        { key: "role", label: "Role", width: "15%" }
      ]}
      rows={data}
      tableBodyProps={{
        isLoading
      }}
    />
  );
};

export default Users;
