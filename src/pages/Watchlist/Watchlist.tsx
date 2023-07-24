/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@default.ca>
 */
import { SessionManager } from "@/common/SessionManager";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { WatchlistState } from "@/services/WatchlistManagementService/WatchlistEnum";
import WatchlistService from "@/services/WatchlistManagementService/WatchlistService";
import { DeleteIcon, MinusIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const userId: any = SessionManager.getUserID();
  const watchlistService = new WatchlistService();
  const isLoggedIn = SessionManager.isLoggedIn();
  const movieManager = new MovieMagementService();
  const [isWatchlistEmpty, setIsWatchlistEmpty] = useState<boolean>(false);
  const toast = useToast();

  const [list, setList] = useState([] as any);

  const navigate = useNavigate();

  const setWatchListMovies = async (watchlist: any) => {
    let l: any = [];
    await Promise.all(
      watchlist.map(async (item: any) => {
        const movieId = item.movieId;
        const movie = await movieManager.fetchMovieByID(movieId);
        movie["status"] = item.status;
        l.push(movie);
      })
    );
    return l;
  };

  const getWatchlist = async () => {
    const watchlist = await watchlistService.getWatchlist(userId);

    if (watchlist.length === 0) {
      setIsWatchlistEmpty(true);
    }

    const x = await setWatchListMovies(watchlist);
    setList(x);
  };

  const fetchData = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      await getWatchlist();
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  const navigateToMoviePage = (e: any) => {
    e.preventDefault();
    if (e.target.id) {
      navigate("/movie-details/" + e.target.id);
    }
  };

  const handleRemove = async (id: any) => {
    // setList(list.filter((movie) => movie.id !== id));
    const response = await watchlistService.removeFromWatchlist(userId, id);
    fetchData();
    if (response == WatchlistState.RemoveMovieSuccess) {
      toast({
        title: "Movie Removed",
        description: "Successfully removed from watchlist",
        duration: 1000,
        isClosable: true,
        status: "error",
        position: "top",
        icon: <DeleteIcon />,
      });
    } else {
      alert("System Error! Please try again");
    }
  };

  const clearWatchlist = async () => {
    const response = await watchlistService.clearWatchlist(userId);
    fetchData();
    if (response == WatchlistState.ClearWatchlistSuccess) {
      toast({
        title: "Cleared Watchlist",
        description: "All movies from watchlist are removed",
        duration: 1000,
        isClosable: true,
        status: "success",
        position: "top",
        icon: <DeleteIcon />,
      });
    } else {
      alert("System Error! Please try again");
    }
  };

  return (
    <Box
      p={5}
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Heading p={7} as="h3" size="2xl" color="orange">
        My Watchlist
      </Heading>
      <br></br>
      <Box flexGrow={1}>
        {isWatchlistEmpty ? (
          <Box>
            <Heading size="lg" color="orange.400" p={10}>
              No Movies present in the Watchlist
            </Heading>
          </Box>
        ) : (
          <SimpleGrid p={10}>
            <Box>
              <HStack>
                <Spacer></Spacer>
                <Button
                  p={5}
                  color={"red.600"}
                  bgColor={"red.200"}
                  fontWeight={"bold"}
                  onClick={clearWatchlist}
                  leftIcon={<DeleteIcon />}
                  _hover={{
                    bgColor: "red.500", // New background color on hover
                    color: "white", // New text color on hover
                  }}
                >
                  Clear Watchlist
                </Button>
              </HStack>
              <br></br>
            </Box>

            {list.map((movie: any) => (
              <>
                <Card
                  key={movie._id}
                  rounded="lg"
                  width="100%"
                  alignItems="start"
                  justifyContent={"start"}
                >
                  <CardHeader w={"100%"}>
                    <Flex>
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        objectFit="cover"
                        maxH="200"
                        maxW="120"
                      />
                      <VStack
                        w="100%"
                        ml="15px"
                        alignItems="left"
                        justifyContent="space-between"
                      >
                        <VStack alignItems="left">
                          <Text
                            textAlign="left"
                            fontSize={20}
                            fontWeight="bold"
                          >
                            {movie.title}
                          </Text>
                          <HStack>
                          <Box rounded="xl" bgColor={"orange.200"}>
                            <Text color={"orange.700"} fontSize={10} p={1} fontStyle={"italic"} fontWeight={"extrabold"}>
                              {movie.status.toUpperCase()}
                            </Text>
                          </Box>
                          <Spacer></Spacer>
                          </HStack>
                         
                          <Text noOfLines={[1, 2]} fontSize={13}>
                            {movie.plot}
                          </Text>
                        </VStack>
                        <HStack w={"100%"} justifyContent="flex-end">
                       
                          <Button
                            id={movie._id}
                            onClick={navigateToMoviePage}
                            leftIcon={<ViewIcon />}
                          >
                            View
                          </Button>
                          <Button
                            onClick={() => handleRemove(movie._id)}
                            color="red.500"
                            leftIcon={<MinusIcon />}
                          >
                            Remove
                          </Button>
                        </HStack>
                      </VStack>
                    </Flex>
                  </CardHeader>
                </Card>
                <br></br>
              </>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Watchlist;
