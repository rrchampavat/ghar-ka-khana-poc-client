import deactivateUser from "@/services/user/deactivateUser.service";
import { COLOR } from "@/shared/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../button/Button";
import Modal from "../Modal";

type DeactivateUserModalProps = {
  isOpen: boolean;
  onOpenChange?: ((isOpen: boolean) => void) | undefined;
  selectedUser: USER;
};

const DeactivateUserModal = (props: DeactivateUserModalProps) => {
  const { isOpen, onOpenChange, selectedUser } = props;
  const queryClient = useQueryClient();

  const { mutate: deactivateUserMutation, isPending } = useMutation({
    mutationFn: () => deactivateUser(selectedUser.id!),
    onSuccess: () => {
      onOpenChange?.(false);
      // Invalidate queries or update state as needed
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      headerContent="Deactivate User"
      bodyContent={
        <div className="flex">
          Are you sure you want to{" "}
          <span style={{ color: COLOR["danger"] }} className="mx-1">
            deactivate
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
            onPress={() => deactivateUserMutation()}
            isLoading={isPending}
          >
            Deactivate
          </Button>
        </>
      }
    />
  );
};

export default DeactivateUserModal;
