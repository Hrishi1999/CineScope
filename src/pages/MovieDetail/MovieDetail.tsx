import { SessionManager } from "@/common/SessionManager";
import CommentBox from "@/components/CommentBox";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import ReviewsMagementService from "@/services/ReviewsManagementService/ReviewsManagementService";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import WatchlistService from "@/services/WatchlistManagementService/WatchlistService";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import MovieGridItem from "@/components/MovieGridItem";
import { LabelRecommendedMoviesToUser } from "@/components/LabelRecommendedMoviesToUser";
import { AlertNoRecommendationMovies } from "@/components/AlertNoRecommendationMovies";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate("/");
  }

  const movieManagementService = new MovieMagementService();
  const userManagementService = new UserManagementService();
  const watchlistService = new WatchlistService();
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState([]);
  const [movieDetails, setMovieDetails] = useState({}) as any;
  const [movieRating, setMovieRating] = useState() as any;
  const [movieReview, setMovieReview] = useState() as any;
  const [wstatus, setWStatus] = useState("") as any;
  const [logUser, setLogUser] = useState("") as any;
  const isLoggedIn = SessionManager.isLoggedIn();
  const userID = SessionManager.getUserID();
  const [rating, setRating] = useState(0);
  const toast = useToast();

  const [isRecommendMovieFound, setIsRecommendMovieFound] = useState(true);
  // navigate(0);

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const getUserName = async () => {
    let userName = "";
    if (userID) {
      const body: any = await userManagementService.getUser(userID);
      userName = body.userName;
    }
    return userName;
  };

  const fetchMovieDetails = async () => {
    const body: any = await movieManagementService.fetchMovieByID(id);
    if (body == null) {
      alert(
        "Something went wrong while loading movie details. Please try again."
      );
    } else {
      const released_date = new Date(body.released_date);
      const yyyy = released_date.getFullYear();
      let mm: any = released_date.getMonth() + 1;
      let dd: any = released_date.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedReleasedDate = mm + "/" + dd + "/" + yyyy;
      body.released_date = formattedReleasedDate;
      setMovieDetails(body);
      fetchRecommendedMovies(body.genres, body._id);

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
      const body1: any = await ReviewsMagementService.getRating(body.title);
      const roundedOff = body1.toFixed(2);
      console.log(`Rounded off rating: ${roundedOff}`);
      setMovieRating(roundedOff);

      const body2: any = await ReviewsMagementService.getReview(body.title);
      const reviewedMovies = body2.filter((movie: any) => {
        return movie.hasOwnProperty("review");
      });
      const ratingObjects = reviewedMovies.map((i: any) => {
        return {
          email: i.userName ?? "Unknown",
          comment: i.review,
        };
      });
      setDisplay(ratingObjects);

      if (userID) {
        const body: any = await watchlistService.getWatchlist(userID);

        body.forEach((item: any) => {
          if (item.id === id && item.status === "watched") {
            setWStatus("watched");
            console.log(`Movie ID: ${item.id}, Status: ${item.status}`);
          }
        });
      }
    }

    const fetchedUserName = await getUserName();
    setLogUser(fetchedUserName);
  };

  const handleRatingClick = async (value: number) => {
    setRating(value);
    const fetchedUserName = await getUserName();
    const body: any = await ReviewsMagementService.addRating(
      movieDetails.title,
      fetchedUserName,
      value,
      id
    );

    toast({
      description: "Rating has been added",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fetchedUserName = await getUserName();
    console.log(`Movie ID: ${id}, User: ${fetchedUserName}`);
    const body: any = await ReviewsMagementService.addReview(
      movieDetails.title,
      fetchedUserName,
      comment,
      id
    );
    setMovieReview(body);
    setComment("");
  };

  const userRecommendedMovies = recommendedMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));
  const navigateToWatchlist = () => {
    navigate("/watchlist");
  };

  const navigateToParentalGuide = (id: string) => {
    navigate("/parents-guide/" + id);
  };

  const handleChildData = async (data: string) => {
    console.log(`Received data from child component: ${data}`);

    const fetchedUserName = await getUserName();
    const body: any = await ReviewsMagementService.addReview(
      movieDetails.title,
      fetchedUserName,
      data,
      id
    );
    setMovieReview(body);
  };

  const fetchRecommendedMovies = async (genres: any, movieId: any) => {
    const body: any =
      await movieManagementService.fetchRecommendedMoviesForMovieDetailsPage(
        genres,
        movieId
      );
    if (body == null) {
      setIsRecommendMovieFound(false);
    } else {
      setIsRecommendMovieFound(true);
      setRecommendedMovies(body);
    }
  };

  useEffect(() => {
    fetchMovieDetails();

    // fetchRatingCount();
  }, [movieReview]);

  return (
    <Box maxW="1200px" mx="auto" my="6">
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap="6"
      >
        <Box ml={2} mr={2}>
          <Image
            src={movieDetails.poster}
            alt={movieDetails.title}
            w={["350px", "500px", "700px", "700px"]}
            h={["350px", "500px", "600px", "600px"]}
          />

          {/* ratings and reviews enabled only for logged in users */}
          {isLoggedIn && (
            <Box boxShadow="2xl" p="2" mb="4" ml={2} mt={12} width="85%">
              <Text mb={2} fontWeight="medium">
                Add Rating
              </Text>
              <ButtonGroup>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    size="xs"
                    colorScheme={value <= rating ? "yellow" : "gray"}
                    leftIcon={<Icon as={FaStar} />}
                    onClick={() => handleRatingClick(value)}
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          )}

          {isLoggedIn && ( //&& wstatus === "watched" - need to add later
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="2"
              mt="3"
              boxShadow="xl"
              ml="0.5rem"
              width="85%"
              h="40vh"
            >
              <Text mb={3} fontWeight="medium">
                Add a Review
              </Text>
              <Textarea
                placeholder="Write a comment..."
                size="sm"
                resize="none"
                border="none"
                _focus={{ outline: "none" }}
                height="75%"
                value={comment}
                onChange={handleTextChange}
              />
              <Flex justifyContent="flex-end" marginTop="1">
                <Button size="sm" colorScheme="yellow" onClick={handleSubmit}>
                  Submit
                </Button>
              </Flex>
            </Box>
          )}
        </Box>

        <Box
          ml={2}
          mr={2}
          w={["350px", "450px", "700px", "700px"]}
          h={["auto", "auto", "auto", "auto"]}
        >
          <Text fontWeight="bold" fontSize="4xl" mt="4">
            {movieDetails.title}"
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            {movieDetails.released_date} | {movieDetails.time_in_minutes}{" "}
            Minutes | Rating{" "}
            <Badge colorScheme="yellow" fontSize="1.2rem">
              {/* {movieRatingCount} */}
              {movieRating}
            </Badge>{" "}
            |{" "}
            {movieDetails.genres?.map((genre: any, index: any) => (
              <Badge key={index} mr="1" colorScheme="purple">
                {genre}
              </Badge>
            ))}
          </Text>

          <Box mt="4" mb="4">
            <Text>{movieDetails.plot}</Text>
          </Box>
          <Divider my="1" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Cast
            </Text>
            {movieDetails.cast?.map((actor: any, index: any) => (
              <HStack key={index}>
                <Text fontWeight="semibold">{actor}</Text>
              </HStack>
            ))}
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Director
            </Text>
            <Text fontWeight="semibold">{movieDetails.director}</Text>
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Trailer
            </Text>
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                width="500"
                height="315"
                src={movieDetails.trailor}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </AspectRatio>
          </VStack>
          <Button
            size="md"
            colorScheme="yellow"
            onClick={() => {
              navigateToParentalGuide(movieDetails._id);
            }}
          >
            Parents Guide
          </Button>
        </Box>
      </Grid>
      <Divider my="6" />
      <Box ml={2} mr={2}>
        <Text fontWeight="bold" fontSize="2xl" mb="4">
          Related Images
        </Text>
        <SimpleGrid p={4} columns={{ base: 1, md: 4, lg: 8 }} gap={4}>
          {movieDetails.images?.map((image: any, index: any) => (
            <GridItem colSpan={2}>
              <Image
                height="300px"
                width="400px"
                src={image}
                borderRadius="sm"
                boxShadow="md"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
      <Box w="100%" maxW="1200px" mx="auto" boxShadow="xl" p={10}>
        <CommentBox
          value={display}
          loggedUser={logUser}
          onChildData={handleChildData}
        />
      </Box>
      {isRecommendMovieFound ? (
        <>
          <LabelRecommendedMoviesToUser />
          <SimpleGrid
            p={4}
            w="100%"
            columns={{ base: 1, md: 3, lg: 7 }}
            gap={6}
          >
            {userRecommendedMovies}
          </SimpleGrid>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default MovieDetails;
