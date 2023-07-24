import { SessionManager } from "@/common/SessionManager";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProfileDialog = (props: DeleteProfileDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const onDelete = async () => {
    const userManagementService = new UserManagementService();
    const userID = SessionManager.getUserID();
    const state = await userManagementService.deleteUser(userID!!);

    if (state === UserManagementState.UserDeletedSuccess) {
      toast({
        title: "Profile Deleted",
        description: "Your profile has been deleted.",
        status: "success",
        duration: 5000,
      });
      SessionManager.logout();
      navigate("/");
    } else {
      toast({
        title: "Oops! Something went wrong.",
        description: "Your profile could not be deleted.",
        status: "error",
        duration: 3500,
      });
    }

    props.onClose();
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
            Delete Profile
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete your profile?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteProfileDialog;
