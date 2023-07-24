import ListOfAllMovies from "@/components/ListOfAllMovies";
import { VStack } from "@chakra-ui/react";
import { AdminNavBar } from "../../components/AdminNavBar";
import ListOfNewMovies from "../../components/ListOfNewMovies";
import ListOfTopMovies from "../../components/ListOfTopMovies";
import { FilterResults } from "../Filter/FilterResults";
export default function AdminHome() {
  return (
    <div>
      {/* <AdminNavBar></AdminNavBar> */}
      <VStack w="100%">
      <ListOfNewMovies></ListOfNewMovies>
      <ListOfAllMovies></ListOfAllMovies>
      {/* <ListOfTopMovies></ListOfTopMovies> */}
      </VStack>
    </div>
  );
}
