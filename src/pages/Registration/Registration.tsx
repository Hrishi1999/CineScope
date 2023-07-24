/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import Genres from "@/common/Genres";
import CustomContainer from "@/components/CustomContainer";
import CustomInputField from "@/components/CustomInputField";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import {
  Alert,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import React, { useState } from "react";
import {
  AiFillLock,
  AiOutlineCalendar,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserData } from "./UserData";

export default function Registration() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    about: "",
    genres: [],
  } as UserData);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = React.useState<Option[]>([]);

  const navigate = useNavigate();

  const validateAndRegister = async (event: any) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");

    const {
      userName,
      email,
      password,
      confirmPassword,
      dob: dateOfBirth,
      about,
      genres,
    } = data;

    // regex
    // generated using https://regex-generator.olafneumann.org/

    // reference: https://regexr.com/3e48o
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const nameRegex: RegExp = /^[A-Za-z]+/g;

    // reference: https://regexr.com/
    const passwordRegex: RegExp =
      /^([A-Za-z0-9!@#$%^&*(),.?":{}|<>\[\]]){8,}$/g;

    const today = new Date();
    const bDate = new Date(dateOfBirth);
    const age = today.getFullYear() - bDate.getFullYear();

    if (
      (userName.length === 0 || userName === "") &&
      !nameRegex.test(userName)
    ) {
      setErrorMessage(
        "Invalid user name. It can't be empty and should contain only letters."
      );
      setError(true);
      return;
    } else if (email.length === 0 || !emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Invalid email.");
      return;
    } else if (password.length === 0 || !passwordRegex.test(password)) {
      setError(true);
      setErrorMessage("Invalid password. It should be at least 8 characters.");
      return;
    } else if (confirmPassword !== password) {
      setError(true);
      setErrorMessage("Passwords do not match.");
      return;
    } else if (age < 18 || dateOfBirth === "") {
      setError(true);
      setErrorMessage("You must be 18 years old to register.");
      return;
    } else if (result.length === 0) {
      setError(true);
      setErrorMessage("You must select at least one genre.");
      return;
    } else if (about.length === 0 || about === "") {
      setError(true);
      setErrorMessage("You must enter a short bio.");
      return;
    }

    setError(false);
    setErrorMessage("");

    const userManagementService = new UserManagementService();
    const userData = { ...data, genres: result.map((genre) => genre.label) };
    const message = await userManagementService.register(userData);

    if (message === UserManagementState.UserRegistrationSuccess) {
      navigate("/");
    } else {
      setError(true);
      setErrorMessage(message);
    }
  };

  const accent = "yellow.500";

  return (
    <Flex
      height="80%"
      flexShrink={"0"}
      mx={4}
      justifyContent="center"
      alignItems="center"
    >
      <CustomContainer>
        <Center mb={6}>
          <VStack>
            <Heading>Register</Heading>
            <Text
              color="gray.500"
              fontSize="sm"
              width={"300px"}
              textAlign="center"
            >
              Get started with your CineScope account
            </Text>
          </VStack>
        </Center>

        {/* First Name Input */}
        <CustomInputField
          icon={<AiOutlineUser color="gray.300" />}
          id="userName"
          type="name"
          placeholder="User Name"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Email Input */}
        <CustomInputField
          icon={<AiOutlineMail color="gray.300" />}
          id="email"
          type="email"
          placeholder="Email"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Password Input */}
        <CustomInputField
          icon={<AiOutlineLock color="gray.300" />}
          id="password"
          type="password"
          placeholder="Password"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Confirm Password */}
        <CustomInputField
          icon={<AiFillLock color="gray.300" />}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Date of Birth */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineCalendar color="gray.300" />}
          />
          <Input
            id="dob"
            type="text"
            variant="outline"
            placeholder="Date of Birth"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </InputGroup>

        {/* Genres */}

        <Autocomplete
          as={Input}
          focusBorderColor={accent}
          id="genres"
          options={Genres}
          result={result}
          setResult={(options: Option[]) => setResult(options)}
          placeholder="Enter your preferred..."
          mb={12}
        ></Autocomplete>

        <CustomInputField
          icon={<AiOutlineUnorderedList color="gray.300" />}
          id="about"
          type="text"
          placeholder="About you"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {error && (
          <SlideFade in={error} unmountOnExit={true}>
            <Alert status="error" mb={2} borderRadius="md" padding={4}>
              {errorMessage}
            </Alert>
          </SlideFade>
        )}

        <Button colorScheme={"yellow"} mb={0} onClick={validateAndRegister}>
          Register
        </Button>
      </CustomContainer>
    </Flex>
  );
}
