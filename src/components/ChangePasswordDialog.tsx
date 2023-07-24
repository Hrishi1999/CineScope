/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/

import { SessionManager } from "@/common/SessionManager";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { Alert, SlideFade, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import CustomInputField from "./CustomInputField";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  data: any;
  onClose: () => void;
}

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const [passData, setPassData] = useState({
    oldPass: props.data.oldPass,
    newPass: "",
    confirmPass: "",
  } as any);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const toast = useToast();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const accent = "yellow.500";

  const updatePassword = async () => {
    const userID = SessionManager.getUserID();
    const d = { ...props.data, password: passData.newPass };
    const userManagementService = new UserManagementService();
    const state = await userManagementService.updateUser(userID!!, d);

    if (state === UserManagementState.UserUpdatedSuccess) {
      toast({
        title: "Password updated successfully.",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops! Something went wrong.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  };

  const validateAndChange = (event: any) => {
    event.preventDefault();

    setError(false);
    setMessage("");

    if (passData.oldPass === "") {
      setError(true);
      setMessage("Please enter your current password.");
      return;
    } else if (
      passData.newPass === "" ||
      passData.confirmPass === "" ||
      passData.newPass != passData.confirmPass
    ) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    } else if (passData.oldPass === passData.newPass) {
      setError(true);
      setMessage("New password cannot be the same as the old password.");
      return;
    }

    if (!error) {
      updatePassword();
      props.onClose();
    }
  };

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Change Password
          </AlertDialogHeader>
          <AlertDialogBody>Change your password here.</AlertDialogBody>
          <VStack p={6}>
            {" "}
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="oldPass"
              type="password"
              placeholder="Current Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setPassData({
                  ...passData,
                  [event.target.id]: event.target.value,
                })
              }
            />
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="newPass"
              type="password"
              placeholder="New Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setPassData({
                  ...passData,
                  [event.target.id]: event.target.value,
                })
              }
            />
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="confirmPass"
              type="password"
              placeholder="Confirm Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setPassData({
                  ...passData,
                  [event.target.id]: event.target.value,
                })
              }
            />
            <SlideFade in={error} unmountOnExit={true}>
              <Alert status="error" mb={2} borderRadius="md" padding={4}>
                {message}
              </Alert>
            </SlideFade>
          </VStack>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" onClick={validateAndChange} ml={3}>
              Update Password
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ChangePasswordDialog;
