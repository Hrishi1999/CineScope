/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@dal.ca>
 */
import Movie from "@/common/Movie";
import { SessionManager } from "@/common/SessionManager";
import { WatchlistState } from "@/services/WatchlistManagementService/WatchlistEnum";
import WatchlistService from "@/services/WatchlistManagementService/WatchlistService";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button, FormControl,
  FormLabel, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AddMovieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  isAdded: (status: boolean) => void;
};

const AddMovieDialog: React.FC<AddMovieDialogProps> = ({
  isOpen,
  onClose,
  movie,
  isAdded,
}) => {
  const [status, setStatus] = useState<string>("");
  const toast = useToast();
  const navigateTo = useNavigate();

  const handleAddMovie = async () => {
    console.log(status);

    if (status.length === 0) {
      toast({
        title: "Status Required",
        description: "Please Select any status",
        duration: 1000,
        isClosable: true,
        status: "error",
        position: "top",
      });
    } else {
      isAdded(true);
      // const userId =
      const isLoggedIn = SessionManager.isLoggedIn();
      const userId: any = SessionManager.getUserID();
      if (!isLoggedIn) {
        console.log("Please register");
        navigateTo("/login");
      } else {
        const watchlistService = new WatchlistService();
        const message = await watchlistService.addToWatchlist(
          userId,
          movie._id!,
          status
        );

        if (message == WatchlistState.AddMovieSuccess) {
          toast({
            title: "Movie Added",
            description: "Successfully added to watchlist",
            duration: 1000,
            isClosable: true,
            status: "success",
            position: "top",
            icon: <AddIcon />,
          });
          onClose();
        } else {
          onClose();
          alert("Movie Already Added");
        }
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader fontWeight={"bold"} fontSize="3xl" color="orange">
          <AddIcon boxSize={"5"}></AddIcon> Add Movie to Watchlist
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginLeft={6}>
          <FormControl>
            <FormLabel
              fontWeight={"extrabold"}
              color="orange.400"
              fontSize="xl"
            >
              {movie.title}
            </FormLabel>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              placeholder="Select status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="watching">Watching</option>
              <option value="plan-to-watch">Plan To Watch</option>
              <option value="watched">Watched</option>
              <option value="dropped">Dropped</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={handleAddMovie}>
            Add Movie
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMovieDialog;
