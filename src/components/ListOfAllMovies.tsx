/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LabelAllMovies } from "./LabelAllMovies";
import MovieGridItemAdmin from "./MovieGridItemAdmin";

export default function ListOfAllMovies() {
  const [allMovies, setAllMovies] = useState<any>([]);
  
  useEffect(() => {
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
        setAllMovies(body);
      }
    };
    fetchAllMovies();
  }, []);
  return (
    <div>
      <LabelAllMovies />
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {allMovies.map((movie: any) => (
          <MovieGridItemAdmin key={movie._id} movie={movie} />
        ))}
      </SimpleGrid>
    </div>
  );
}
