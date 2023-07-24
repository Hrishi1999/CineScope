/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import {
  Box,
  Button,
  ButtonProps,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { SessionManager } from "@/common/SessionManager";
export const AdminNavBar = () => {
  const navigate = useNavigate();
  const addMovie = () => {
    navigate("/add-movie/");
  };

  const addNews = () => {
    navigate("/add-news/");
  };

  const switchToNormalUser = () => {
    localStorage.setItem("isAdmin", "false");
    window.location.replace("/");
  };

  const handleLogout = () => {
    SessionManager.logout()
    localStorage.setItem("isAdmin", "false");
    window.location.replace("/");
  }
  const handleLogoClick = () => {
    navigate("/");
  }
  return (
    <div>
      <Box as="nav" boxShadow="md" mb="20px">
        <Flex
          as="div"
          mx="auto"
          p="4"
          justifyContent="center"
          alignItems="center"
        >
          <HStack gap={[3,5,7]}>
            {/* <HStack> */}
            <Tooltip>
              <Button variant="unstyled">
              <Text
                textAlign="left"
                bgGradient="linear-gradient(311deg, rgba(143,107,41,1) 0%, rgba(237,193,65,1) 33%, rgba(223,159,40,1) 82%);"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
                ml="20px"
                onClick={handleLogoClick}
                
              >
                CineScope
                
              </Text>
              </Button>
              </Tooltip>
            {/* </HStack> */}

            <Menu >
              <MenuButton aria-label="Options" fontSize={["sm", "sm", "lg"]} px={4}
    py={2} transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    _hover={{ bg: 'gray.400' }}
    _focus={{ boxShadow: 'outline' }}
                >
                Menu
              </MenuButton>
              <MenuList>
                <MenuItem onClick={addMovie}> Add Movie</MenuItem>
                <MenuItem onClick={addNews}> Add News</MenuItem>
                {/* <MenuItem>Comment moderation</MenuItem>
                <MenuItem>Review moderation</MenuItem> */}
              </MenuList>
            </Menu>
          </HStack>

       
       <Spacer ml={[3,5,7]}></Spacer>
          <HStack gap={[3,5,7]}>
            <NavLink
              to="/search"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 700 : 400 };
              }}
            >
              Search
            </NavLink>

            <Text fontSize={["sm", "sm", "lg", "lg"]} fontWeight="semibold">Welcome, Admin!</Text>
            <Button colorScheme="yellow" fontSize={["sm", "sm", "md", "md"]} onClick = {handleLogout} mr="20">
              Logout
            </Button>
          </HStack>
        </Flex>
      </Box>
    </div>
  );
};
