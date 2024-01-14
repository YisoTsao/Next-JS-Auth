import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";

export default function BaseModal({ fetchUser }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    console.log(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("formData:", formData);
    newUser(formData);
  };

  const newUser = (data) => {
    const { name, role, email, age, avatar, team, status } = data;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
      email,
      role,
      age: Number(age),
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      team,
      status,
      actions: "",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        onClose();
        fetchUser();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Role"
                  placeholder="Enter your role"
                  variant="bordered"
                  onChange={(e) => handleChange("role", e.target.value)}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Age"
                  placeholder="Enter your age"
                  variant="bordered"
                  onChange={(e) => handleChange("age", e.target.value)}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Avatar"
                  placeholder="Enter your avatar"
                  variant="bordered"
                  onChange={(e) => handleChange("avatar", "")}
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Team"
                  placeholder="Enter your team"
                  variant="bordered"
                  onChange={(e) => handleChange("team", e.target.value)}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Status"
                  placeholder="Enter your status"
                  variant="bordered"
                  onChange={(e) => handleChange("status", "active")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  關閉
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  建立
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
