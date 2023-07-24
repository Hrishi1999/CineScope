/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Center,
  Heading,
  Flex,
  Stack,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import Movie from "@/common/Movie";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { MovieManagementState } from "@/services/MovieManagementService/MovieManagementEnum";

export default function AddMovie() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Map<string, string>>();
  const [cast, setCast] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const [todayDate, setTodayDate] = useState<any>();
  const toast = useToast();

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
  }, []);

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

  const checkCastNames = () => {
    for (let i = 0; i < cast.length; i++) {
      let name = cast[i];
      if (!/^[A-Za-z ]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkGenreNames = () => {
    for (let i = 0; i < genre.length; i++) {
      let name = genre[i];
      if (!/^[A-Za-z ]+$/.test(name)) {
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

  const validateForm = () => {
    // Using Map
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
    if (movie.released_date == undefined || movie.released_date == null) {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      movie.cast = cast;
      movie.genres = genre;
      movie.images = image;
      const movieManagementService = new MovieMagementService();
      const state = await movieManagementService.addMovie(movie);
      if (state == MovieManagementState.MovieAddSuccess) {
        toast({
          title: `Movie added sucessfully.`,
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
      <Center m={[2, 5, 10]}>
        <Box
          p="6"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          width={[200, 300, 500]}
        >
          <Heading padding={[2, 4, 6]}>Add a movie</Heading>
          <FormControl isInvalid={!!formErrors?.get("title")}>
            <FormLabel htmlFor="title">Movie Title</FormLabel>
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
            <FormLabel htmlFor="posterLink">Poster Link</FormLabel>
            <Input
              type="text"
              id="poster"
              name="poster"
              value={movie.poster}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>{formErrors?.get("poster")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("thumbnail")}>
            <FormLabel htmlFor="thumbnail">Thumbnail Link</FormLabel>
            <Input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={movie.thumbnail}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>{formErrors?.get("thumbnail")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("trailor")}>
            <FormLabel htmlFor="trailor">Trailor Link</FormLabel>
            <Input
              type="text"
              id="trailor"
              name="trailor"
              value={movie.trailor}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>{formErrors?.get("trailor")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("plot")}>
            <FormLabel htmlFor="firstname">Plot (Description)</FormLabel>
            <Textarea
              id="plot"
              name="plot"
              value={movie.plot}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>{formErrors?.get("plot")}</FormErrorMessage>
            <small>Must be less than 250 words.</small>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("director")}>
            <FormLabel htmlFor="director">Director Name</FormLabel>
            <Input
              type="text"
              id="director"
              name="director"
              value={movie.director}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>{formErrors?.get("director")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("released_date")}>
            <FormLabel htmlFor="released_date">Released Date</FormLabel>
            <Input
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
              id="released_date"
              name="released_date"
              type="date"
              max={todayDate}
            ></Input>
            <FormErrorMessage>
              {formErrors?.get("released_date")}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("time_in_minutes")}>
            <FormLabel htmlFor="time_in_minutes">Time in minutes</FormLabel>
            <Input
              type="text"
              id="time_in_minutes"
              name="time_in_minutes"
              value={movie.time_in_minutes}
              onChange={(event: any) =>
                setMovie({ ...movie, [event.target.id]: event.target.value })
              }
            />
            <FormErrorMessage>
              {formErrors?.get("time_in_minutes")}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formErrors?.get("cast")}>
            <FormLabel htmlFor="cast">Cast</FormLabel>
            <Stack spacing="2">
              {cast.map((item, index) => (
                <Box key={index} display="flex">
                  <Input
                    value={item}
                    onChange={(e) => handleCastChange(index, e.target.value)}
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

          <FormControl isInvalid={!!formErrors?.get("genre")}>
            <FormLabel htmlFor="genre">Genre</FormLabel>
            <Stack spacing="2">
              {genre.map((item, index) => (
                <Box key={index} display="flex">
                  <Input
                    value={item}
                    onChange={(e) => handleGenreChange(index, e.target.value)}
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

          <FormControl isInvalid={!!formErrors?.get("images")}>
            <FormLabel htmlFor="images">Images</FormLabel>
            <Stack spacing="2">
              {image.map((item, index) => (
                <Box key={index} display="flex">
                  <Input
                    value={item}
                    onChange={(e) => handleImageChange(index, e.target.value)}
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

          <Flex mt="5" gap={5} justifyContent="left">
            <Button onClick={handleSubmit} colorScheme="green">
              {" "}
              Submit
            </Button>
            <Button onClick={handleCancel} colorScheme="red">
              {" "}
              Cancel
            </Button>
          </Flex>
        </Box>
      </Center>
    </div>
  );
}
