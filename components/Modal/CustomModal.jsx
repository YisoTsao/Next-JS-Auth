import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "../../app/users/DeleteIcon";

export default function CustomModal({ id, onClose, fetchUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = () => {
    deleteUser();
  };

  const deleteUser = () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`/api/users/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        onClose();
        fetchUser();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        size="sm"
        variant="light"
        onPress={onOpen}
      >
        <Tooltip color="danger" content="Delete user">
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                提醒訊息
              </ModalHeader>
              <ModalBody>
                <p>確定要刪除嗎?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
