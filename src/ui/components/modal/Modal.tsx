import {
  Modal as HeroUIModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps as HeroUIModalProps
} from "@heroui/react";
import type { ReactNode } from "react";
import Button from "../button/Button";

type ModalProps = Omit<HeroUIModalProps, "children"> & {
  headerContent?: ReactNode;
  bodyContent: ReactNode;
  footerContent?: ReactNode;
};

const Modal = (props: ModalProps) => {
  const {
    headerContent,
    bodyContent,
    footerContent,
    // TODO: Need to figure why onClose was added
    // onClose,
    onOpenChange,
    isOpen
  } = props;

  return (
    <HeroUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          {footerContent || (
            <>
              {" "}
              <Button color="danger" variant="light">
                Close
              </Button>
              <Button color="primary">Action</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </HeroUIModal>
  );
};

export default Modal;
