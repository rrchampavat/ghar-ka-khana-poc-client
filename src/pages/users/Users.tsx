import getUsers from "@/services/user/getUsers.service";
import { USER_ROLE } from "@/shared/constants/enums";
import Avatar from "@/ui/components/avatar/Avatar";
import Table from "@/ui/components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Users = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [sort, setSort] = useState<SORT_PARAMS>({
    sortBy: "",
    sortOrder: "asc"
  });

  const { data, isLoading } = useQuery({
    queryKey: ["user-list", currPage, sort.sortBy, sort.sortOrder],
    queryFn: () =>
      getUsers({
        page: currPage,
        limit: 10,
        sortBy: sort.sortBy as string,
        sortOrder: sort.sortOrder
      }),
    select: (data) => ({
      ...data,
      data: data.data.map((user) => ({
        key: user.id,
        first_name: (
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
    })
  });

  return (
    <Table
      columns={[
        { key: "first_name", label: "Name", width: "28%", allowsSorting: true },
        { key: "email", label: "Email", width: "30%", allowsSorting: true },
        {
          key: "contact_no",
          label: "Contact No",
          width: "27%",
          allowsSorting: true
        },
        { key: "role", label: "Role", width: "15%" }
      ]}
      paginationProps={{
        page: currPage,
        setPage: setCurrPage,
        totalPages: data?.totalPages
      }}
      rows={data?.data}
      tableBodyProps={{
        isLoading,
        loadingState: isLoading ? "loading" : "idle"
      }}
      sortDescriptor={sort}
      setSortDescriptor={setSort}
    />
  );
};

export default Users;
