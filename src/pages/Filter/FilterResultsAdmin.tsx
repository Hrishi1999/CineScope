/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { HStack, Box, Button, Input, Select } from "@chakra-ui/react";
import { AlertForNoMovieFound } from "@/components/AlertForNoMovieFound";
import { useState } from "react";
import MovieGridItemAdmin from "@/components/MovieGridItemAdmin";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";

export const FilterResultsAdmin = () => {
    const [afterFilteration, setAfterFilteration] = useState([]);
    const [newKeyword, setNewKeyword] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    
    const fetchAllMovies = async () => {
      const movieManagementService = new MovieMagementService();
      const body: any = await movieManagementService.fetchAllMovies();

      if (body == null) {
        alert("Something went wrong loading latest movies. Please try again.");
      } else {
        for (let i = 0; i < body.length; i++) {
          const released_date = new Date(body[i].released_date);
          const yyyy = released_date.getFullYear();
          let mm: any = released_date.getMonth() + 1;
          let dd: any = released_date.getDate();
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          const formattedReleasedDate = mm + "/" + dd + "/" + yyyy;
          body[i].released_date = formattedReleasedDate;
        }
        setAfterFilteration(body);
      }
    };
    
    useEffect(() => {
      fetchAllMovies();
    },[])

    const handleSearch = async (event: any) => {
      if(newKeyword == "" || newKeyword == null){
        fetchAllMovies();
        setYear("");
      }
      else{
        const movieManagementService = new MovieMagementService();
        const body: any = await movieManagementService.searchMovie(newKeyword);
        if(body == null){
          alert("Something went wrong while searching movies. Please try again.")
        }
        else{
          for (let i = 0; i < body.length; i++) {
            const released_date = new Date(body[i].released_date);
            const yyyy = released_date.getFullYear();
            let mm: any = released_date.getMonth() + 1;
            let dd: any = released_date.getDate();
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
            const formattedReleasedDate = mm + "/" + dd + "/" + yyyy;
            body[i].released_date = formattedReleasedDate;
          }
          setAfterFilteration(body);
        }
      }
    };

    const handleReset = async () => {
      window.location.reload();
    }

    const handleFilter = async (event: any) => {
      if(rating == "" && genre == "" && year == "")
      {
        fetchAllMovies();
      }
      else{
        const movieManagementService = new MovieMagementService();
        const body: any = await movieManagementService.filterMovie(year, rating, genre);
        if(body == null){
          alert("Something went wrong while Filtering  movies. Please try again.")
        }
        else{
          for (let i = 0; i < body.length; i++) {
            const released_date = new Date(body[i].released_date);
            const yyyy = released_date.getFullYear();
            let mm: any = released_date.getMonth() + 1;
            let dd: any = released_date.getDate();
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
            const formattedReleasedDate = mm + "/" + dd + "/" + yyyy;
            body[i].released_date = formattedReleasedDate;
          }
          setAfterFilteration(body);
        }
      }
    };
  
    if(afterFilteration.length == 0){
        return(
            <VStack w="100%">
                {/* SearchBar */}
                <Box
                    px={4}
                    w="70%"
                    as="section"
                    marginLeft={5}
                    marginRight={5}
                    >
                    {/* Reference: https://chakra-ui.com/docs/components/stack */}
                    <HStack>
                        <Input
                        size="lg"
                        variant="outline"
                        placeholder="Search"
                        onChange={(event) => {
                            setNewKeyword(event.target.value);
                        }}
                        />
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        variant={"solid"}
                        // onClick = {searchMovies}
                        onClick = {handleSearch}
                        >
                        Search
                        </Button>
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        variant={"solid"}
                        // onClick = {searchMovies}
                        onClick = {handleReset}
                        >
                        Reset
                        </Button>
                    </HStack>
                </Box>

                {/* <FilterDropdown /> */}

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
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        {/* <option value='option4'>8-10</option> */}
                        </Select>
                        <Select
                        placeholder="Genre"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        >
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Fantacy">Fantacy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science Fiction">Science Fiction</option>
                        </Select>
                        <Select
                        placeholder="Year"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        >
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        </Select>
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        // onClick = {filterMovies}
                        onClick = { handleFilter }
                        >
                        Filter
                        </Button>
                    </HStack>
                </Box>
                {<AlertForNoMovieFound/>}
            </VStack>
        );
    }
    else{
        return(
            <VStack w="100%">
                {/* SearchBar */}
                <Box
                    px={4}
                    w="70%"
                    as="section"
                    marginLeft={5}
                    marginRight={5}
                    >
                    {/* Reference: https://chakra-ui.com/docs/components/stack */}
                    <HStack>
                        <Input
                        size="lg"
                        variant="outline"
                        placeholder="Search"
                        onChange={(event) => {
                            setNewKeyword(event.target.value);
                        }}
                        />
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        variant={"solid"}
                        // onClick = {searchMovies}
                        onClick = {handleSearch}
                        >
                        Search
                        </Button>
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        variant={"solid"}
                        // onClick = {searchMovies}
                        onClick = {handleReset}
                        >
                        Reset
                        </Button>
                    </HStack>
                </Box>

                {/* <FilterDropdown /> */}

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
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        {/* <option value='option4'>8-10</option> */}
                        </Select>
                        <Select
                        placeholder="Genre"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        >
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Fantacy">Fantacy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science Fiction">Science Fiction</option>
                        </Select>
                        <Select
                        placeholder="Year"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        >
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        </Select>
                        <Button
                        size="lg"
                        colorScheme={"yellow"}
                        // onClick = {filterMovies}
                        onClick = { handleFilter }
                        >
                        Filter
                        </Button>
                    </HStack>
                </Box>
                
                {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
                <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
                    {afterFilteration.map((movie: any) => (
                        <MovieGridItemAdmin key={movie._id} movie={movie} />
                    ))}
                </SimpleGrid>
            </VStack>
        );
    }
}