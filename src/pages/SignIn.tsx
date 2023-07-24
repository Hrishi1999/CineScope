import CustomContainer from "@/components/CustomContainer";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // reference: https://regexr.com/3e48o
    const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  const login = async (event: any) => {
    event.preventDefault();

    if (username.length === 0 || password.length === 0) {
      setError(true);
      setMessage("Please enter your username and password");
    } else if (!validateEmail(username)) {
      setError(true);
      setMessage("Enter a valid email address");
    } else if (!validatePassword(password)) {
      setError(true);
      setMessage("The password should be more than 6 characters long");
    } else {
      setError(false);

      const userManagementService = new UserManagementService();
      const response = await userManagementService.login(username, password);
      console.log(typeof response);
      if (typeof response === "string") {
        if (response === UserManagementState.UserLoginFailedUserDoesNotExist) {
          setError(true);
          setMessage("User not found");
          return;
        } else if (
          response === UserManagementState.UserLoginFailedIncorrectPassword
        ) {
          setError(true);
          setMessage("Incorrect password");
          return;
        } else {
          setError(true);
          setMessage("Something went wrong");
          return;
        }
      } else {
        setError(false);
        setMessage("");
        if (response.type === "admin") {
          localStorage.setItem("isAdmin", "true");
          window.location.replace("/");
        } else {
          navigate("/");
        }
      }
    }
  };

  const yellowAccent = "yellow.500";

  return (
    <Flex height="80%" mx={4} justifyContent="center" alignItems="center">
      <CustomContainer>
        <Center mb={6}>
          <VStack>
            <Heading>Sign In</Heading>
            <Text
              color="gray.500"
              fontSize="sm"
              width={"300px"}
              textAlign="center"
            >
              Login to your CineScope account to access your watchlist, reviews,
              and more.
            </Text>
          </VStack>
        </Center>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineUser color="gray.300" />}
          />
          <Input
            type="email"
            variant="outline"
            placeholder="johndoe@dal.ca"
            focusBorderColor={yellowAccent}
            mb={3}
            onChange={(event) => setUsername(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiFillLock color="gray.300" />}
          />
          <Input
            type="password"
            variant="outline"
            placeholder="**********"
            focusBorderColor={yellowAccent}
            mb={6}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputGroup>

        {error && (
          <SlideFade in={error} unmountOnExit={true}>
            <Alert status="error" mb={2} borderRadius="md" padding={4}>
              {message}
            </Alert>
          </SlideFade>
        )}

        {!error && message.length > 0 ? (
          <SlideFade in={!error} unmountOnExit={true}>
            <Alert status="success" mb={2} borderRadius="md" padding={4}>
              {message}
            </Alert>
          </SlideFade>
        ) : (
          <></>
        )}

        <Box mb={2}>
          <Link to={"/reset-password"}>
            <Text color={yellowAccent} fontSize={"sm"}>
              Forgot Password?
            </Text>
          </Link>
        </Box>

        <Button colorScheme="yellow" mb={8} onClick={login}>
          Log In
        </Button>

        <HStack justifyContent="space-between">
          <Link to={"/register"}>
            <Text as="span" color="gray.500">
              Don't have a CineScope account?{" "}
            </Text>
            <Text as="span" color={yellowAccent}>
              Sign Up
            </Text>
          </Link>
        </HStack>
      </CustomContainer>
    </Flex>
  );
}
