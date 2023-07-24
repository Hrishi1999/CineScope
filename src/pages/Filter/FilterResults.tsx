import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { HStack, Box, Button, Input, Select } from "@chakra-ui/react";
import { AlertForNoMovieFound } from "@/components/AlertForNoMovieFound";
import { useState } from "react";
import MovieGridItem from "@/components/MovieGridItem";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import movieGenres from "@/common/Genres";

export const FilterResults = () => {
  const [afterFilteration, setAfterFilteration] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const movieManagementService = new MovieMagementService();
  const years = [];
  const ratings = [];

  for (let year = 1970; year <= 2023; year++) {
    years.push(year);
  }

  for (let rating = 1; rating <= 10; rating++) {
    ratings.push(rating);
  }

  const fetchAllMovies = async () => {
    const body: any = await movieManagementService.fetchAllMovies();
    if (body == null) {
      alert("Something went wrong while loading movies. Please try again.");
    } else {
      setAfterFilteration(body);
    }
  };

  const handleSearch = async () => {
    if (newKeyword == "" || newKeyword == null) {
      fetchAllMovies();
    } else {
      const body: any = await movieManagementService.searchMovie(newKeyword);
      if (body == null) {
        alert("Something went wrong while searching movies. Please try again.");
      } else {
        setAfterFilteration(body);
      }
    }
  };

  const handleFilter = async () => {
    if (rating == "" && genre == "" && year == "") {
      fetchAllMovies();
    } else {
      const body: any = await movieManagementService.filterMovie(
        year,
        rating,
        genre
      );
      if (body == null) {
        alert(
          "Something went wrong while Filtering  movies. Please try again."
        );
      } else {
        setAfterFilteration(body);
      }
    }
  };

  const handleReset = async () => {
    setNewKeyword("");
    fetchAllMovies();
    setGenre("");
    setRating("");
    setYear("");
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  if (afterFilteration.length == 0) {
    return (
      <VStack w="100%">
        {/* SearchBar */}
        <Box px={4} w="70%" as="section" marginLeft={5} marginRight={5}>
          {/* Reference: https://chakra-ui.com/docs/components/stack */}
          <HStack>
            <Input
              size="lg"
              variant="outline"
              value={newKeyword}
              placeholder="Search"
              onChange={(event) => {
                setNewKeyword(event.target.value);
              }}
            />
            <Button
              size="lg"
              colorScheme={"yellow"}
              variant={"solid"}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              size="lg"
              colorScheme={"yellow"}
              variant={"solid"}
              // onClick = {searchMovies}
              onClick={handleReset}
            >
              Reset
            </Button>
          </HStack>
        </Box>
        <Box
          px={4}
          w="70%"
          as="section"
          marginBottom={5}
          marginLeft={5}
          marginRight={5}
        >
          <HStack direction={["column", "row"]}>
            <Select
              placeholder="Ratings"
              id="ratings"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {movieGenres.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Button size="lg" colorScheme={"yellow"} onClick={handleFilter}>
              Filter
            </Button>
          </HStack>
        </Box>
        {<AlertForNoMovieFound />}
      </VStack>
    );
  } else {
    return (
      <VStack w="100%">
        {/* SearchBar */}
        <Box px={4} w="70%" as="section" marginLeft={5} marginRight={5}>
          {/* Reference: https://chakra-ui.com/docs/components/stack */}
          <HStack>
            <Input
              size="lg"
              variant="outline"
              value={newKeyword}
              placeholder="Search"
              onChange={(event) => {
                setNewKeyword(event.target.value);
              }}
            />
            <Button
              size="lg"
              colorScheme={"yellow"}
              variant={"solid"}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              size="lg"
              colorScheme={"yellow"}
              variant={"solid"}
              // onClick = {searchMovies}
              onClick={handleReset}
            >
              Reset
            </Button>
          </HStack>
        </Box>
        <Box
          px={4}
          w="70%"
          as="section"
          marginBottom={5}
          marginLeft={5}
          marginRight={5}
        >
          <HStack direction={["column", "row"]}>
            <Select
              placeholder="Ratings"
              id="ratings"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {movieGenres.map((g) => (
                <option key={g.value} value={g.label}>
                  {g.label}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Button size="lg" colorScheme={"yellow"} onClick={handleFilter}>
              Filter
            </Button>
          </HStack>
        </Box>

        {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
        <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
          {afterFilteration.map((movie: any) => (
            <MovieGridItem key={movie._id} movie={movie} />
          ))}
        </SimpleGrid>
      </VStack>
    );
  }
};
