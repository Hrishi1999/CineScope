/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { AdminNavBar } from "../../components/AdminNavBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Image,
  Select,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  useToast,
  Divider,
  SimpleGrid,
  GridItem,
  VStack,
  HStack,
  AspectRatio,
  Badge,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import Movie from "@/common/Movie";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { MovieManagementState } from "@/services/MovieManagementService/MovieManagementEnum";

export default function UpdateMovieDetails() {

  const { id } = useParams();
  const [cast, setCast] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Map<string, string>>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [movie, setMovie] = useState({
    title: "",
    released_date: Date,
    director: "",
    genres: [],
    time_in_minutes: "",
    plot: "",
    cast: [],
    images: [],
    thumbnail: "",
    poster: "",
    trailor: "",
  } as unknown as Movie);

  const getFormattedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedDate = yyyy + "-" + mm + "-" + dd;
    return formattedDate;
  };
  const todayDate = getFormattedDate(new Date());
  const [formattedReleasedDate, setFormattedReleasedDate] = useState(todayDate);

  useEffect(() => {
    const fetchMovieByID = async () => {
      const movieManagementService = new MovieMagementService();
      const body: any = await movieManagementService.fetchMovieByID(id);
      if (body == null) {
        alert("Something went wrong loading movie details. Please try again.");
      } else {
        setCast(body.cast);
        setGenre(body.genres);
        setImage(body.images);
        const released_date = new Date(body.released_date);
        const formattedReleasedDate = getFormattedDate(released_date);
        setFormattedReleasedDate(formattedReleasedDate);
        setMovie(body);
      }
    };
    fetchMovieByID();
  }, []);

  const handleAddCast = () => {
    setCast([...cast, ""]);
  };

  const handleRemoveCast = (index: number) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  const handleCastChange = (index: number, value: string) => {
    const newItems = [...cast];
    newItems[index] = value;
    setCast(newItems);
  };

  const handleAddGenre = () => {
    setGenre([...genre, ""]);
  };

  const handleRemoveGenre = (index: number) => {
    setGenre(genre.filter((_, i) => i !== index));
  };

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...genre];
    newGenres[index] = value;
    setGenre(newGenres);
  };

  const handleAddImage = () => {
    setImage([...image, ""]);
  };

  const handleRemoveImage = (index: number) => {
    setImage(image.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...image];
    newImages[index] = value;
    setImage(newImages);
  };

  const checkCastNames = () => {
    for (let i = 0; i < cast.length; i++) {
      let name = cast[i];
      if (!/^[A-Za-z -]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkGenreNames = () => {
    for (let i = 0; i < genre.length; i++) {
      let name = genre[i];
      if (!/^[A-Za-z -]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkImage = () => {
    for (let i = 0; i < image.length; i++) {
      let name = image[i];
      if (name.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        return true;
      }
    }
    return false;
  };

  const goToNextImage = () => {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === movie.images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === 0 ? movie.images.length - 1 : currentIndex - 1
    );
  };


  const validateForm = () => {
    const errors = new Map();
    if (!movie.title) {
      errors.set("title", "Title is required");
    }

    if (!movie.poster) {
      errors.set("poster", "Poster link is required");
    } else if (movie.poster.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      errors.set(
        "poster",
        "Poster link must be in valid format(jpeg|jpg|gif|png)."
      );
    }

    if (!movie.plot) {
      errors.set("plot", "Plot for the movie is required");
    } else if (movie.plot.split(" ").length >= 250) {
      errors.set("plot", "Plot details must be less than 250 letters.");
    }

    if (!movie.director) {
      errors.set("director", "Director name is required");
    } else if (!/^[A-Za-z ]+$/.test(movie.director)) {
      errors.set("director", "Director name must be in letters.");
    }
    if (cast.length == 0) {
      errors.set("cast", "Cast is required");
    } else if (checkCastNames()) {
      errors.set("cast", "Cast names must be in letters.");
    }
    if (genre.length == 0) {
      errors.set("genre", "Genre is required");
    } else if (checkGenreNames()) {
      errors.set("genre", "Genre names must be in letters.");
    }
    if (formattedReleasedDate == undefined || formattedReleasedDate == null) {
      errors.set("released_date", "Released date is required");
    }
    if (movie.time_in_minutes == "") {
      errors.set("time_in_minutes", "Time in minutes is required");
    } else if (!/^\d+$/.test(movie.time_in_minutes)) {
      errors.set("time_in_minutes", "Time in minutes must be in digits.");
    }
    if (image.length == 0) {
      errors.set("images", "Image is required");
    } else if (checkImage()) {
      errors.set("images", "Images must be in valid format(jpeg|jpg|gif|png).");
    }

    if (!movie.thumbnail) {
      errors.set("thumbnail", "Thumbnail link is required");
    } else if (movie.thumbnail.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      errors.set(
        "thumbnail",
        "Thumbnail link must be in valid format(jpeg|jpg|gif|png)."
      );
    }

    if (!movie.trailor) {
      errors.set("trailor", "Trailor link is required");
    } else if (
      movie.trailor.match(/^https:\/\/www\.youtube\.com\/embed\/.*/) == null
    ) {
      errors.set(
        "trailor",
        "Trailor link must be in valid embedded youtube link."
      );
    }

    setFormErrors(errors);

    return errors.size === 0;
  };

  const handleUpdate = async (event: any) => {
    if (validateForm()) {
      const date = new Date(Date.parse(formattedReleasedDate));
      movie.released_date = date;
      const movieManagementService = new MovieMagementService();
      const state = await movieManagementService.updateMovieByID(
        movie._id,
        movie
      );
      if (state == MovieManagementState.MovieUpdateSuccess) {
        toast({
          title: `Movie updated sucessfully.`,
          status: "success",
          isClosable: true,
        });
        navigate("/");
      } else {
        alert(state);
      }
    }
  };

  const handleCancel = (event: any) => {
    navigate("/");
  };

  

  return (
    <div>
      <Box maxW="1200px" mx="auto" my="6">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]} // set 1 column on small screens, 2 columns on medium screens, 3 columns on large screens, and 4 columns on extra-large screens
          gap="6"
        >
          {" "}
          <VStack alignItems="flex-start" mb={4}>
            <Box ml={2} mr={2} mb={2}>
              <Image
                src={movie.poster}
                alt={movie.title}
                w={["350px", "500px", "700px", "700px"]}
                h={["350px", "500px", "600px", "600px"]}
              />
            </Box>
            <Divider my="2" />
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Trailer
            </Text>
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                width="500"
                height="315"
                src={movie.trailor}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </AspectRatio>

            <Divider my="2" />
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Images
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              mb={2}
            >
              {movie.images.map((image, index) => (
                <Text
                  key={index}
                  fontSize="xl"
                  color={index === currentImageIndex ? "blue.500" : "gray.500"}
                  cursor="pointer"
                  mr={2}
                  onClick={() => setCurrentImageIndex(index)}
                ></Text>
              ))}
            </Flex>
            <Image
              src={movie.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              w={["100px", "300px", "500px", "500px"]}
              h={["100px", "200px", "300px", "300px"]}
            />
            <Text w={["100px", "300px", "500px", "500px"]} textAlign="center">
              {`Image ${currentImageIndex + 1}`}
            </Text>
            <HStack
              pt={3}
              justifyContent="center"
              w={["100px", "300px", "500px", "500px"]}
            >
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
                onClick={goToPrevImage}
                left={2}
                transform="translateY(-50%)"
                colorScheme="blue"
                variant="ghost"
              />

              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon />}
                onClick={goToNextImage}
                right={2}
                transform="translateY(-50%)"
                colorScheme="blue"
                variant="ghost"
              />
            </HStack>
          </VStack>
          <Box
            ml={2}
            mr={2}
            w={["350px", "450px", "700px", "700px"]}
            h={["auto", "auto", "auto", "auto"]}
          >
            <FormControl isInvalid={!!formErrors?.get("title")}>
              <FormLabel
                htmlFor="title"
                fontWeight="bold"
                fontSize="2xl"
                mb="1"
              >
                Movie Title
              </FormLabel>
              <Input
                type="text"
                id="title"
                name="title"
                value={movie.title}
                onChange={(event: any) =>
                  setMovie({ ...movie, [event.target.id]: event.target.value })
                }
              />
              <FormErrorMessage>{formErrors?.get("title")}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors?.get("poster")}>
              <FormLabel
                htmlFor="posterLink"
                fontWeight="bold"
                fontSize="2xl"
                mb="1"
              >
                Poster Link
              </FormLabel>
              <Input
                type="text"
                id="poster"
                name="poster"
                value={movie.poster}
                onChange={(event: any) =>
                  setMovie({
                    ...movie,
                    [event.target.id]: event.target.value,
                  })
                }
              />
              <FormErrorMessage>{formErrors?.get("poster")}</FormErrorMessage>
            </FormControl>
            <Box mt="4" mb="4">
              <FormControl isInvalid={!!formErrors?.get("plot")}>
                <FormLabel
                  htmlFor="description"
                  fontWeight="bold"
                  fontSize="2xl"
                  mb="1"
                >
                  Plot (Description)
                </FormLabel>
                <Textarea
                  // type="textarea"
                  id="plot"
                  name="plot"
                  value={movie.plot}
                  onChange={(event: any) =>
                    setMovie({
                      ...movie,
                      [event.target.id]: event.target.value,
                    })
                  }
                />
                <FormErrorMessage>{formErrors?.get("plot")}</FormErrorMessage>
                <small>Must be less than 250 words.</small>
              </FormControl>
            </Box>

            <VStack alignItems="flex-start" mb={4}>
              <Text fontWeight="bold" fontSize="2xl" mb="1">
                Director
              </Text>
              <FormControl isInvalid={!!formErrors?.get("director")}>
                <Input
                  type="text"
                  id="director"
                  name="director"
                  value={movie.director}
                  onChange={(event: any) =>
                    setMovie({
                      ...movie,
                      [event.target.id]: event.target.value,
                    })
                  }
                />
                <FormErrorMessage>
                  {formErrors?.get("director")}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack alignItems="flex-start" mb={4}>
              <Text fontWeight="bold" fontSize="2xl" mb="1">
                Released Date
              </Text>
              <FormControl isInvalid={!!formErrors?.get("released_date")}>
                <Input
                  type="date"
                  id="released_date"
                  name="released_date"
                  value={formattedReleasedDate}
                  onChange={(event) =>
                    setFormattedReleasedDate(event.target.value)
                  }
                />
                <FormErrorMessage>
                  {formErrors?.get("released_date")}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack alignItems="flex-start" mb={4}>
              <FormControl isInvalid={!!formErrors?.get("time_in_minutes")}>
                <FormLabel
                  htmlFor="time_in_minutes"
                  fontWeight="bold"
                  fontSize="2xl"
                  mb="1"
                >
                  Time in minutes
                </FormLabel>
                <Input
                  type="text"
                  id="time_in_minutes"
                  name="time_in_minutes"
                  value={movie.time_in_minutes}
                  onChange={(event: any) =>
                    setMovie({
                      ...movie,
                      [event.target.id]: event.target.value,
                    })
                  }
                />
                <FormErrorMessage>
                  {formErrors?.get("time_in_minutes")}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack alignItems="flex-start" mb={4}>
              <FormControl isInvalid={!!formErrors?.get("trailor")}>
                <FormLabel htmlFor="trailor">Trailor Link</FormLabel>
                <Input
                  type="text"
                  id="trailor"
                  name="trailor"
                  value={movie.trailor}
                  onChange={(event: any) =>
                    setMovie({
                      ...movie,
                      [event.target.id]: event.target.value,
                    })
                  }
                />
                <FormErrorMessage>
                  {formErrors?.get("trailor")}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack alignItems="flex-start" mb={4}>
              <FormControl isInvalid={!!formErrors?.get("cast")}>
                <FormLabel
                  htmlFor="cast"
                  fontWeight="bold"
                  fontSize="2xl"
                  mb="1"
                >
                  Cast
                </FormLabel>
                <Stack spacing="2">
                  {cast.map((item, index) => (
                    <Box key={index} display="flex">
                      <Input
                        value={item}
                        fontWeight="semibold"
                        onChange={(e) =>
                          handleCastChange(index, e.target.value)
                        }
                        placeholder={`Cast ${index + 1}`}
                        flex="1"
                        mr="2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveCast(index)}
                      >
                        Remove Cast
                      </Button>
                    </Box>
                  ))}
                  <Button type="button" onClick={handleAddCast}>
                    Add Cast
                  </Button>
                </Stack>
                <FormErrorMessage>{formErrors?.get("cast")}</FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack alignItems="flex-start" mb={4}>
              <FormControl isInvalid={!!formErrors?.get("genre")}>
                <FormLabel
                  htmlFor="genre"
                  fontWeight="bold"
                  fontSize="2xl"
                  mb="1"
                >
                  Genre
                </FormLabel>
                <Stack spacing="2">
                  {genre.map((item, index) => (
                    <Box key={index} display="flex">
                      <Input
                        value={item}
                        fontWeight="semibold"
                        onChange={(e) =>
                          handleGenreChange(index, e.target.value)
                        }
                        placeholder={`Genre ${index + 1}`}
                        flex="1"
                        mr="2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveGenre(index)}
                      >
                        Remove Genre
                      </Button>
                    </Box>
                  ))}
                  <Button type="button" onClick={handleAddGenre}>
                    Add Genre
                  </Button>
                </Stack>
                <FormErrorMessage>{formErrors?.get("genre")}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack alignItems="flex-start" mb={4}>
              <FormControl isInvalid={!!formErrors?.get("images")}>
                <FormLabel
                  htmlFor="images"
                  fontWeight="bold"
                  fontSize="2xl"
                  mb="1"
                >
                  Images
                </FormLabel>
                <Stack spacing="2">
                  {image.map((item, index) => (
                    <Box key={index} display="flex">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder={`Image ${index + 1}`}
                        flex="1"
                        mr="2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove Image
                      </Button>
                    </Box>
                  ))}
                  <Button type="button" onClick={handleAddImage}>
                    Add Image
                  </Button>
                </Stack>
                <FormErrorMessage>{formErrors?.get("images")}</FormErrorMessage>
              </FormControl>
            </VStack>
            <Flex mt="5" mb={5} gap={5} justifyContent="left">
              <Button onClick={handleUpdate} colorScheme="green">
                {" "}
                Update
              </Button>
              <Button onClick={handleCancel} colorScheme="red">
                {" "}
                Cancel
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}
