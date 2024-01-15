import React, { useState, useEffect, useMemo } from "react";
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

export default function BaseModal({
  fetchUser,
  selectedUser,
  isOpen,
  onClose,
  onOpenChange,
  setSelectedUser,
}) {
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const userMemo = useMemo(() => selectedUser, [selectedUser]);

  useEffect(() => {
    console.log(selectedUser);
    // 如果 selectedUser 存在，則設置為修改模式
    if (selectedUser) {
      setIsEditMode(true);
      setFormData(selectedUser);
    } else {
      // 否則設置為新增模式
      setIsEditMode(false);
      setFormData({});
    }
  }, [selectedUser]);

  const handleChange = (name, value) => {
    console.log(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isEditMode) {
      // 如果是修改模式，執行修改用戶的邏輯
      updateUser(formData);
    } else {
      // 如果是新增模式，執行新增用戶的邏輯
      newUser(formData);
    }
  };

  const updateUser = (data) => {
    // 實現修改用戶的邏輯，類似於 newUser 的邏輯
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...data,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/users/${data?.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSelectedUser(null);
        onClose();
        fetchUser();
      })
      .catch((error) => console.log("error", error));
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
                  defaultValue={selectedUser?.name}
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
                  defaultValue={selectedUser?.email}
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
                  defaultValue={selectedUser?.role}
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
                  defaultValue={selectedUser?.age}
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
                  defaultValue={selectedUser?.avatar}
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
                  defaultValue={selectedUser?.team}
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
                  defaultValue={selectedUser?.status}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  關閉
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {isEditMode ? "Save Changes" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
