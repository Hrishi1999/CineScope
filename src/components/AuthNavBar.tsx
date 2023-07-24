import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AuthNavBar = () => {
  const switchToAdmin = () => {
    localStorage.setItem("isAdmin", "true");
    window.location.replace("/");
  };

  return (
    <Box boxShadow="lg">
      <Flex
        as="nav"
        p="10px"
        mb="20px"
        alignItems="center"
        shadow="10px"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <Box justifyContent="space-between">
          <HStack>
            <Text
              textAlign="left"
              bgGradient="linear-gradient(311deg, rgba(143,107,41,1) 0%, rgba(237,193,65,1) 33%, rgba(223,159,40,1) 82%);"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              ml="20px"
            >
              <Link to="/">CineScope</Link>
            </Text>
          </HStack>
        </Box>
        <Spacer></Spacer>
      </Flex>
    </Box>
  );
};

export default AuthNavBar;
