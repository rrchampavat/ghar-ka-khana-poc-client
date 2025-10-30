import getUsers from "@/services/user/getUsers.service";
import { COLOR, ROLE_COLOR, USER_ROLE } from "@/shared/constants/enums";
import Avatar from "@/ui/components/avatar/Avatar";
import Button from "@/ui/components/button/Button";
import DeleteButton from "@/ui/components/button/util/DeleteButton";
import EditButton from "@/ui/components/button/util/EditButton";
import ViewButton from "@/ui/components/button/util/ViewButton";
import UpdateUserModal from "@/ui/components/modal/util/UpdateUserModal";
import Table from "@/ui/components/table/Table";
import Tooltip from "@/ui/components/tooltip/Tooltip";
import { useDisclosure } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { CircleMinusIcon } from "lucide-react";
import { useState } from "react";

const Users = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currPage, setCurrPage] = useState<number>(1);
  const [sort, setSort] = useState<SORT_PARAMS>({
    sortBy: "id",
    sortOrder: "asc"
  });
  const [pageSize, setPageSize] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<USER>();

  const { data, isLoading } = useQuery({
    queryKey: ["user-list", currPage, sort.sortBy, sort.sortOrder, pageSize],
    queryFn: () =>
      getUsers({
        page: currPage,
        limit: pageSize,
        sortBy: sort.sortBy as string,
        sortOrder: sort.sortOrder
      }),
    select: (data) => ({
      ...data,
      data: data.data.map((user) => ({
        key: user.id,
        first_name: (
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Avatar
                src={user.user_image!}
                name={`${user.first_name} ${user.last_name}`}
              />
              {user.first_name} {user.last_name}
            </div>
            {user.deleted_at && (
              <Tooltip content="Deactivated User" color="danger" showArrow>
                <CircleMinusIcon className="w-5 text-red-600" />
              </Tooltip>
            )}
          </div>
        ),
        email: user.email,
        contact_no: user.contact_no,
        role: (
          <span
            style={{
              color: COLOR[ROLE_COLOR[USER_ROLE[user.role]]]
            }}
          >
            {USER_ROLE[user.role]}
          </span>
        ),
        action: (
          <div className="flex flex-row gap-1">
            {user.deleted_at ? (
              <Button
                size="sm"
                variant="ghost"
                color="success"
                className="mx-auto"
              >
                Activate
              </Button>
            ) : (
              <>
                <ViewButton href={`/users/${user.id}`} />

                <EditButton onPress={() => handleEdit(user)} />

                <DeleteButton />
              </>
            )}
          </div>
        )
      }))
    }),
    enabled: Boolean(pageSize)
  });

  const handleEdit = (user: USER) => {
    onOpen();

    setSelectedUser(user);
  };

  return (
    <>
      <Table
        columns={[
          {
            key: "first_name",
            label: "Name",
            width: "25%",
            allowsSorting: true
          },
          { key: "email", label: "Email", width: "25%", allowsSorting: true },
          {
            key: "contact_no",
            label: "Contact No",
            width: "20%",
            allowsSorting: true,
            align: "center"
          },
          {
            key: "role",
            label: "Role",
            width: "15%",
            align: "center"
          },
          { key: "action", label: "Action", width: "15%", align: "center" }
        ]}
        paginationProps={{
          page: currPage,
          setPage: setCurrPage,
          totalPages: data?.totalPages,
          setPageSize: setPageSize
        }}
        rows={data?.data}
        tableBodyProps={{
          isLoading,
          loadingState: isLoading ? "loading" : "idle"
        }}
        sortDescriptor={sort}
        setSortDescriptor={setSort}
      />

      <UpdateUserModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedUser={selectedUser!}
      />
    </>
  );
};

export default Users;
