import updateUser from "@/services/user/updateUser.service";
import { USER_ROLES } from "@/shared/constants/defaultSelectValue";
import { USER_ROLE } from "@/shared/constants/enums";
import userUpdateSchema, {
  type USER_UPDATE_PAYLOAD
} from "@/shared/validation-schemas/auth/userUpdate.schema";
import { Form } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Avatar from "../../avatar/Avatar";
import Button from "../../button/Button";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Modal from "../Modal";

type UpdateUserModalProps = {
  isOpen: boolean;
  onOpenChange?: ((isOpen: boolean) => void) | undefined;
  selectedUser: USER;
};

const initialLoginValues: USER_UPDATE_PAYLOAD = {
  firstName: "",
  lastName: "",
  email: "",
  contactNo: "",
  role: 0,
  userImage: ""
};

const UpdateUserModal = (props: UpdateUserModalProps) => {
  const { isOpen, onOpenChange, selectedUser } = props;

  const queryClient = useQueryClient();

  const [user, setUser] = useState<USER>(selectedUser);
  const [selectedRole, setSelectedRole] = useState<Set<string>>(new Set([]));

  const { handleSubmit, control, reset } = useForm<USER_UPDATE_PAYLOAD>({
    resolver: yupResolver(userUpdateSchema),
    defaultValues: initialLoginValues,
    mode: "onSubmit"
  });

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: (values: USER_UPDATE_PAYLOAD) => updateUser(user.id!, values),
    onSuccess: () => {
      onOpenChange?.(false);
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
      queryClient.invalidateQueries({ queryKey: ["user-by-id", user.id] });
    }
  });

  const handleUpdateUser: SubmitHandler<USER_UPDATE_PAYLOAD> = (
    values: USER_UPDATE_PAYLOAD
  ) => updateUserMutation(values);

  // const { data } = useQuery<USER>({
  //   queryFn: () => getUserById(user.id!),
  //   queryKey: ["user-by-id", user.id],
  //   enabled: !user.id
  // });

  useEffect(() => {
    if (selectedUser?.id) {
      setUser(selectedUser);
      setSelectedRole(new Set([`${selectedUser.role}`]));
      // Reset form with user data
      reset({
        firstName: selectedUser.first_name || "",
        lastName: selectedUser.last_name || "",
        email: selectedUser.email || "",
        contactNo: selectedUser.contact_no || "",
        role: selectedUser.role || 0,
        userImage: selectedUser.user_image || ""
      });
      return;
    }

    // if (!selectedUser.id && data?.id) {
    //   setUser(data);
    //   setSelectedRole(new Set([`${data.role}`]));
    //   // Reset form with fetched data
    //   reset({
    //     firstName: data.first_name || "",
    //     lastName: data.last_name || "",
    //     email: data.email || "",
    //     contactNo: data.contact_no || "",
    //     role: data.role || 0,
    //     userImage: data.user_image || ""
    //   });
    // }
  }, [selectedUser?.id, reset]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setUser(selectedUser);
      setSelectedRole(new Set([`${selectedUser.role}`]));
      // Reset form with user data
      reset({
        firstName: selectedUser.first_name || "",
        lastName: selectedUser.last_name || "",
        email: selectedUser.email || "",
        contactNo: selectedUser.contact_no || "",
        role: selectedUser.role || 0,
        userImage: selectedUser.user_image || ""
      });
    }
    onOpenChange?.(isOpen);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      headerContent="Update User"
      bodyContent={
        <Form id="update-user-form" onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="flex w-full justify-between gap-2">
            <Controller
              name="firstName"
              control={control}
              render={({ field, formState }) => (
                <Input
                  type="text"
                  label="First name"
                  placeholder="First Name"
                  className="w-full"
                  errorMessage={formState.errors.firstName?.message}
                  isRequired
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field, formState }) => (
                <Input
                  type="text"
                  label="Last name"
                  placeholder="Last Name"
                  className="w-full"
                  errorMessage={formState.errors.lastName?.message}
                  isRequired
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex w-full justify-between gap-2">
            <Controller
              name="email"
              control={control}
              render={({ field, formState }) => (
                <Input
                  type="email"
                  label="Email"
                  placeholder="Email"
                  className="w-full"
                  errorMessage={formState.errors.email?.message}
                  isRequired
                  {...field}
                />
              )}
            />

            <Controller
              name="contactNo"
              control={control}
              render={({ field, formState }) => (
                <Input
                  type="tel"
                  label="Contact no."
                  placeholder="Contact no."
                  className="w-full"
                  errorMessage={formState.errors.contactNo?.message}
                  isRequired
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex w-full items-center gap-2">
            <Controller
              name="role"
              control={control}
              render={({ field, formState }) => (
                <Select
                  items={USER_ROLES}
                  label="Role"
                  placeholder="Role"
                  selectedKeys={selectedRole}
                  className="w-1/2"
                  errorMessage={formState.errors.role?.message}
                  isRequired
                  disabledKeys={[`${USER_ROLE["Admin"]}`]}
                  onSelectionChange={(keys) => {
                    setSelectedRole(keys as Set<string>);
                    // Convert the selected key back to number for the form field
                    const selectedKey = Array.from(keys)[0];
                    if (selectedKey) {
                      field.onChange(Number(selectedKey));
                    }
                  }}
                />
              )}
            />

            <Controller
              name="userImage"
              control={control}
              render={() => (
                <>
                  <Avatar
                    src={user.user_image}
                    name={`${user.first_name} ${user.last_name}`}
                  />
                </>
              )}
            />
          </div>
        </Form>
      }
      footerContent={
        <Button
          size="sm"
          isLoading={isPending}
          type="submit"
          form="update-user-form"
        >
          Update
        </Button>
      }
    />
  );
};

export default UpdateUserModal;
