import { SessionManager } from "@/common/SessionManager";
import { AlertNoRecommendationMovies } from "@/components/AlertNoRecommendationMovies";
import { LabelAllMovies } from "@/components/LabelAllMovies";
import { LabelNewReleased } from "@/components/LabelNewReleased";
import { LabelRecommendedMoviesToUser } from "@/components/LabelRecommendedMoviesToUser";
import MovieGridItem from "@/components/MovieGridItem";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import WatchlistService from "@/services/WatchlistManagementService/WatchlistService";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function Home() {
  
  const [latestMovies, setLatestMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const movieManagementService = new MovieMagementService();
  const [userLoginStatus, setUserLoginStatus] = useState<boolean>(false);
  const [isMovieInWatchList, setIsMovieInWatchList] = useState(false);


  const newRealesedMovies = latestMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const totalMovies = allMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));
  const userRecommendedMovies = recommendedMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));


  const fetchAllMovies = async () => {
    const body: any = await movieManagementService.fetchAllMovies();
    if (body == null) {
      alert("Something went wrong loading latest movies. Please try again.");
    } else {
      setAllMovies(body);
    }
  };

  const fetchLatestMovies = async () => {
    const body: any = await movieManagementService.fetchLatestMovies();
    if (body == null) {
      alert("Something went wrong loading latest movies. Please try again.");
    } else {
      setLatestMovies(body);
    }
  };

  

  const fetchRecommendedMoviesToUser = async () => {
    const userId: any = SessionManager.getUserID()
    const watchListService = new WatchlistService();
    const watchListMovies: any = await watchListService.getWatchlist(userId);
    
    if(watchListMovies.length != 0){
      
      setIsMovieInWatchList(true);
      const watchListMoviesId = [...new Set(watchListMovies.map((watchListmovie: { movieId: any; }) => watchListmovie.movieId))];
      const genresList: any = [];
  
      const movieGenres = async (movieId: any) => {
        const fetchedMovie = await movieManagementService.fetchMovieByID(movieId);
        const movieGenres = fetchedMovie.genres;
        movieGenres.map((movieGenre: any) => {
          if (!genresList.includes(movieGenre)) {
            genresList.push(movieGenre);
          }
        })
      }
      
      const response = await Promise.all(watchListMoviesId.map(movieGenres));
      const body: any = await movieManagementService.fetchRecommendedMoviesToUser(genresList);
      if (body == null) {
        alert("Something went wrong loading recommended movies. Please try again.");
      } else {
        setRecommendedMovies(body);
      }
    }

    
  };

  useEffect(() => {
    fetchLatestMovies();
    fetchAllMovies();
    if(SessionManager.isLoggedIn()){
      setUserLoginStatus(true);
      fetchRecommendedMoviesToUser();
    }
  },[]);

  return (
    <VStack w="100%">
      {/* <LabelMostRated /> */}
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      {/* <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {highestRatedMovies}
      </SimpleGrid> */}
      <LabelNewReleased />
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newRealesedMovies}
      </SimpleGrid>
      <LabelAllMovies />
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {totalMovies}
      </SimpleGrid>

      {userLoginStatus ? (
        <>
          <LabelRecommendedMoviesToUser />
                {isMovieInWatchList ? (
              <>
                <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
                  {userRecommendedMovies}
                </SimpleGrid>
              </>
                
            ) : (
              <AlertNoRecommendationMovies />
            )}
        </>
      ) : (
        <div></div>
      )}
    </VStack>
  );
}
