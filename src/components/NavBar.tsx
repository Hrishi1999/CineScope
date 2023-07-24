/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@dal.ca>
 */

import { SessionManager } from "@/common/SessionManager";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = SessionManager.isLoggedIn();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggle = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  const switchToAdmin = () => {
    localStorage.setItem("isAdmin", "true");
    window.location.replace("/");
  };



  const logout = () => {
    SessionManager.logout();
    navigate("/");
  };

  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userID = localStorage.getItem("userID");
      if (userID) {
        const userManagementService = new UserManagementService();
        const data: any = await userManagementService.getUser(userID!!);
        console.log(data);
        setUserName(data.userName);
        setUserID(data._id);
      }
    };

    getUser();
  }, []);

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

        <Stack
          spacing="30px"
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
          display={{ base: isNavOpen ? "flex" : "none", md: "flex" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Watchlist
          </NavLink>

          <NavLink
            to="/news"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            News And Updates
          </NavLink>
          <NavLink
            to="/search"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Search
          </NavLink>
          <Menu isOpen={isOpen}>
            <MenuButton
              mx={1}
              py={[1, 2, 2]}
              px={4}
              borderRadius={5}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              aria-label="Courses"
              fontWeight="normal"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              onClick={async () => {
                if (userID == null || userID == "") {
                  navigate("/login");
                } else {
                  navigate("/profile/" + userName);
                }
              }}
            >
              <Avatar name={userName} />
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
              {!isLoggedIn && (
                <MenuItem
                  onClick={() => {
                    navigate("login");
                  }}
                >
                  Login
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem
                  onClick={() => {
                    navigate("account-settings");
                  }}
                >
                  Account Settings
                </MenuItem>
              )}
              {isLoggedIn && <MenuItem onClick={logout}>Logout</MenuItem>}
              {/* {isLoggedIn && (
                <MenuItem onClick={switchToAdmin}>Switch to Admin</MenuItem>
              )} */}
            </MenuList>
          </Menu>
          <Box display={{ base: "flex", md: "none" }} onClick={toggle}>
            <CloseIcon />
          </Box>

          <Spacer></Spacer>
        </Stack>
        <Box
          display={isNavOpen ? "none" : { base: "flex", md: "none" }}
          onClick={toggle}
        >
          <HamburgerIcon />
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
