/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/

import { SessionManager } from "@/common/SessionManager";
import { MovieManagementState } from "@/services/MovieManagementService/MovieManagementEnum";
import MovieManagementService from "@/services/MovieManagementService/MovieManagementService";
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
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { useRef, useState } from "react";

interface AddGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
}

const AddGuideDialog = (props: AddGuideDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  const toast = useToast();

  const addGuide = async () => {
    const movieManagementService = new MovieManagementService();
    const result = await movieManagementService.addGuide(
      props.movieId,
      comment,
      severity,
      category,
      SessionManager.getUserID()!!
    );

    if (result === MovieManagementState.GuideAddSuccess) {
      toast({
        title: "Guide Added",
        description: "Your guide has been added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      props.onClose();
    } else {
      toast({
        title: "Something went wrong!",
        description: "Your guide has not been added. Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
            Add Guide
          </AlertDialogHeader>
          <AlertDialogBody>
            Let everyone know if they need to be cautious!
          </AlertDialogBody>
          <VStack p={6}>
            <Textarea
              placeholder="I saw this midway through the movie..."
              onChange={(e) => setComment(e.target.value)}
            />

            <Select
              placeholder="Select Severity"
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </Select>
            <Select
              placeholder="Select Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Violence">Violence</option>
              <option value="Language">Language</option>
              <option value="Gore">Gore</option>
              <option value="Intense Scenes">Intense Scenes</option>
              <option value="Sexual Content">Sexual Content</option>
              <option value="Drugs">Drugs and Alcohol</option>
            </Select>
          </VStack>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" onClick={addGuide} ml={3}>
              Add Guide
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AddGuideDialog;
