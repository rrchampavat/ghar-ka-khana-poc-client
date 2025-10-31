import activateUser from "@/services/user/activateUser.service";
import { COLOR } from "@/shared/constants/enums";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../button/Button";
import Modal from "../Modal";

type ActivateUserModalProps = {
  isOpen: boolean;
  onOpenChange?: ((isOpen: boolean) => void) | undefined;
  selectedUser: USER;
};

const ActivateUserModal = (props: ActivateUserModalProps) => {
  const { isOpen, onOpenChange, selectedUser } = props;
  const queryClient = useQueryClient();

  const { mutate: activateUserMutation, isPending } = useMutation({
    mutationFn: () => activateUser(selectedUser.id!),
    onSuccess: () => {
      onOpenChange?.(false);
      // Invalidate queries or update state as needed
      queryClient.invalidateQueries({ queryKey: ["user-list"] });

      addToast({
        title: "Success",
        description: "User activated successfully.",
        color: "success"
      });
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      headerContent="Activate User"
      bodyContent={
        <div className="flex">
          Are you sure you want to{" "}
          <span style={{ color: COLOR["success"] }} className="mx-1">
            activate
          </span>{" "}
          {selectedUser?.first_name}?
        </div>
      }
      footerContent={
        <>
          <Button
            variant="light"
            onPress={() => onOpenChange?.(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            color="danger"
            onPress={() => activateUserMutation()}
            isLoading={isPending}
          >
            Activate
          </Button>
        </>
      }
    />
  );
};

export default ActivateUserModal;
