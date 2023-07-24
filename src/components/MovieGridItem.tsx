import Movie from "@/common/Movie";
import AddMovieDialog from "@/components/AddMovieDialog";
import ReviewsMagementService from "@/services/ReviewsManagementService/ReviewsManagementService";
import { AddIcon, CheckIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieGridItemProps {
  movie: Movie;
}

export default function MovieGridItem(props: MovieGridItemProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAdded, setIsAdded] = useState(false);
  const navigateTo = useNavigate();
  const [movieRatingCount, setMovieRatingCount] = useState(0);
  const [count, setCount] = useState(0);

  const getMovieDetails = (e: any) => {
    navigateTo("/movie-details/" + props.movie._id);
    window.location.reload();
  };

  const fetchRatingCount = async () => {
    const response: any = await ReviewsMagementService.getRating(
      props.movie.title
    );
    const roundedOff = response.toFixed(2);
    setMovieRatingCount(roundedOff);

    // const body: any = await ReviewsMagementService.getRatingCountForMovie(
    //   props.movie._id
    // );
    // if (body == null || body == undefined || body.length == 0) {
    //   setMovieRatingCount(0);
    // } else {
    //   setMovieRatingCount(body[0].rating);
    // }
  };

  const fetchCount = async () => {
    const body: any = await ReviewsMagementService.getCountForRate(
      props.movie._id
    );
    setCount(body);
  };

  useEffect(() => {
    fetchRatingCount();
    fetchCount();
  }, [movieRatingCount]);

  return (
    <Card
      key={props.movie._id}
      rounded="lg"
      width="100%"
      overflow="hidden"
      alignItems="center"
    >
      <Image
        src={props.movie.poster}
        alt="Movie Image"
        objectFit="cover"
        height="300px"
        width="100%"
      />
      <CardBody color="gray.500">
        <Text>{props.movie.title}</Text>
      </CardBody>
      <Box display="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              // color={i < 9 / 2 ? "teal.500" : "gray.300"}
              color={i < movieRatingCount ? "teal.500" : "gray.300"}
            />
          ))}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          ({count})
        </Box>
      </Box>
      <VStack w="100%" p={4}>
        <Button
          w="100%"
          id={props.movie._id}
          // onClick={getReviewPage}
          onClick={getMovieDetails}
          leftIcon={<ViewIcon />}
        >
          View
        </Button>
        <Button
          w="100%"
          leftIcon={!isAdded ? <AddIcon /> : <CheckIcon />}
          onClick={!isAdded ? onOpen : () => {}}
        >
          {!isAdded ? "Watchlist" : "Added"}
        </Button>
        <AddMovieDialog
          isAdded={setIsAdded}
          isOpen={isOpen}
          onClose={onClose}
          movie={props.movie}
        />
      </VStack>
    </Card>
  );
}
