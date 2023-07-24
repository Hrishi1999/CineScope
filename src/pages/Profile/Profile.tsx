/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import CustomContainer from "@/components/CustomContainer";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import ReviewsMagementService from "@/services/ReviewsManagementService/ReviewsManagementService";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import WatchlistService from "@/services/WatchlistManagementService/WatchlistService";
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  VStack
} from "@chakra-ui/layout";
import { Avatar, Button, Image, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState({} as any);
  const [list, setList] = useState([] as any);
  const [reviews, setReviews] = useState([] as any);

  const movieManager = new MovieMagementService();
  const watchlistService = new WatchlistService();

  const { id } = useParams();
  if (!id) {
    navigate("/");
  }

  useEffect(() => {
    const getUser = async () => {
      const userManagementService = new UserManagementService();
      const user = await userManagementService.getUserByUserName(id!);

      if (user) {
        setUser(user);
        const setWatchListMovies = async (watchlist: any) => {
          let l: any = [];
          await Promise.all(
            watchlist.map(async (item: any) => {
              const movieId = item.movieId;
              let movie = await movieManager.fetchMovieByID(movieId);
              movie.status = item.status;
              l.push(movie);
            })
          );
          return l;
        };

        const getWatchlist = async () => {
          const watchlist = await watchlistService.getWatchlist(user.id);
          const x = await setWatchListMovies(watchlist);
          setList(x);
        };

        const getReviews = async () => {
          const reviews = await ReviewsMagementService.getReviewsByUserName(id);
          setReviews(reviews);
          console.log(reviews);
        };

        await getReviews();
        await getWatchlist();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getUser();
  }, []);

  return (
    <Flex flexShrink={"0"} mx={4} justifyContent="center">
      <Stack
        // h={{ base: "calc(100vh - 20px)", md: "calc(83vh - 20px)" }}
        w={"100%"}
        mb={4}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-start" }}
        justifyContent={"flex-start"}
      >
        <CustomContainer w={{ base: "100%", md: "30%" }} mx={4}>
          <VStack>
            <Avatar size="2xl" name={user.userName} />
            <VStack w="100%">
              <Text fontSize={"lg"} fontWeight="semibold">
                {user.userName ?? ""}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={2}>
                {user.about ?? ""}
              </Text>
              <Button
                w={"100%"}
                size="sm"
                variant={"solid"}
                onClick={() => navigate("/account-settings")}
              >
                Account Settings
              </Button>

              <Box width={"100%"} pt={5} justifyContent={"left"}>
                <Text
                  fontSize="md"
                  fontWeight={"bold"}
                  color="black.500"
                  textAlign="left"
                >
                  Available Statistics
                </Text>
                <Box h={3} />
                <VStack alignItems={"left"}>
                  {/* <Link href="#" color={"yellow.500"}>
                    Clubs Joined (3)
                  </Link>
                  <Link href="#" color={"yellow.500"}>
                    Club Posts (2)
                  </Link> */}
                  <Link href="#" color={"yellow.500"}>
                    Reviews (5)
                  </Link>
                  {/* <Link href="#" color={"yellow.500"}>
                    Trivia Completed (2)
                  </Link> */}
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </CustomContainer>
        <CustomContainer w={{ base: "100%", md: "calc(93vw-350px)" }} mx={4}>
          <CustomContainer p={6} boxShadow="md">
            <VStack alignItems={"left"} justifyContent="center" spacing={4}>
              <HStack>
                <Text fontSize={"lg"} fontWeight="semibold">
                  Watchlist
                </Text>
                <Spacer />
                <Link
                  as={Button}
                  colorScheme="yellow"
                  size="sm"
                  variant={"ghost"}
                  onClick={() => navigate("/watchlist")}
                >
                  View All
                </Link>
              </HStack>
              {list.slice(0, 3).map((item: any) => (
                <CustomContainer boxShadow="md" key={item._id} w={"100%"} p={2}>
                  <HStack alignItems="center">
                    <Image
                      boxShadow={"xl"}
                      borderRadius="md"
                      boxSize="70px"
                      src={item.poster}
                      alt={item.title}
                    />
                    <Box w={1} />
                    <VStack alignItems="start">
                      <Text fontSize={"lg"} fontWeight="semibold">
                        {item.title}
                      </Text>
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        Status: {item.status ?? ""}
                      </Text>
                    </VStack>
                  </HStack>
                </CustomContainer>
              ))}
            </VStack>
          </CustomContainer>{" "}
          <Box h={5} />
          <CustomContainer p={6} boxShadow="md" h={"100%"}>
            <VStack alignItems={"left"} justifyContent="center" spacing={4}>
              <Text fontSize={"lg"} fontWeight="semibold">
                Recent Activity
              </Text>
              {reviews.length === 0 && (
                <Text fontSize={"lg"} fontWeight="semibold">
                  No recent activity
                </Text>
              )}
              {reviews.map((review: any) => (
                <CustomContainer
                  cursor="pointer"
                  boxShadow="md"
                  key={review._id}
                  w={"100%"}
                  p={2}
                >
                  <HStack alignItems="center">
                    <HStack w="100%" p={2} justifyContent={"space-between"}>
                      <Text fontSize={"lg"} fontWeight="semibold">
                        Review | {review.movie}
                      </Text>
                      <Spacer />
                      <Text fontSize={"sm"} fontWeight="semibold">
                        {review.review}
                      </Text>
                    </HStack>
                  </HStack>
                </CustomContainer>
              ))}
            </VStack>
          </CustomContainer>
        </CustomContainer>
      </Stack>
    </Flex>
  );
};

export default Profile;
