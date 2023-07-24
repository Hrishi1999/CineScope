/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import Genres from "@/common/Genres";
import { SessionManager } from "@/common/SessionManager";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import CustomContainer from "@/components/CustomContainer";
import CustomInputField from "@/components/CustomInputField";
import DeleteProfileDialog from "@/components/DeleteProfileDialog";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import {
  Alert,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const [data, setData] = useState({
    userName: "avocado",
    email: "hrishi.patel@dal.ca",
    dateOfBirth: "10-10-1999",
    genres: [],
    password: "",
    about: "",
  });
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([] as string[]);
  const [result, setResult] = React.useState<Option[]>([]);

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    if (!SessionManager.isLoggedIn()) {
      navigate("/login");
    }

    const getUser = async () => {
      const userID = SessionManager.getUserID();
      const userManagementService = new UserManagementService();
      const userData = await userManagementService.getUser(userID!!);

      const date = new Date(userData.dob);

      console.log(userData);

      setData({
        userName: userData.userName,
        email: userData.email,
        dateOfBirth:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          (date.getUTCDate().toString().length === 1
            ? "0" + date.getUTCDate()
            : date.getUTCDate()),
        genres: [],
        password: userData.password,
        about: userData.about,
      });
      setResult(
        userData.genres.map((genre: any) => {
          return { label: genre, value: genre };
        })
      );
    };

    getUser();
  }, []);

  const updateUser = async () => {
    const userID = SessionManager.getUserID();
    const userManagementService = new UserManagementService();
    const state = await userManagementService.updateUser(userID!!, {
      userName: data.userName,
      email: data.email,
      dob: data.dateOfBirth,
      genres: result.map((genre) => genre.label),
      password: data.password,
      confirmPassword: data.password,
      about: data.about,
    });

    if (state === UserManagementState.UserUpdatedSuccess) {
      toast({
        title: "Profile updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops! Something went wrong.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  };

  const updateProfile = async (event: any) => {
    event.preventDefault();

    setError(false);
    setErrors([]);

    console.log(data);

    const { userName, email } = data;

    // regex
    // generated using https://regex-generator.olafneumann.org/

    // reference: https://regexr.com/3e48o
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const nameRegex: RegExp = /^[A-Za-z]+/g;

    const errors: string[] = [];

    if (
      (userName.length === 0 || userName === "") &&
      !nameRegex.test(userName)
    ) {
      console.log(userName.length === 0);
      errors.push(
        "Invalid username name. It can't be empty and should contain only letters."
      );
    }

    if (email.length === 0 || !emailRegex.test(email)) {
      errors.push("Invalid email address.");
    }

    if (result.length === 0) {
      errors.push("Please select at least one genre.");
    }

    if (errors.length > 0) {
      setError(true);
      setErrors(errors);
    } else {
      setError(false);
      setErrors([]);

      await updateUser();

      // navigate("/profile", { state: data });
    }
  };

  const accent = "yellow.500";

  return (
    <Flex
      height="93vh"
      flexShrink={"0"}
      mx={4}
      justifyContent="center"
      alignItems="center"
    >
      <CustomContainer>
        <Center mb={6}>
          <VStack>
            <Heading>Profile and Settings</Heading>
            <Text
              color="gray.500"
              fontSize="sm"
              width={"300px"}
              textAlign="center"
            >
              Update your profile and settings here.
            </Text>
          </VStack>
        </Center>

        {/* First Name Input */}
        <CustomInputField
          value={data.userName}
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

        <CustomInputField
          icon={<AiOutlineUnorderedList color="gray.300" />}
          id="about"
          type="text"
          placeholder="About you"
          focusBorderColor={accent}
          mb={3}
          value={data.about}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Email Input */}
        <CustomInputField
          value={data.email}
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

        {/* Date of Birth */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineCalendar color="gray.300" />}
          />
          <Input
            value={data.dateOfBirth}
            id="dateOfBirth"
            type="date"
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
          placeholder="Enter your preferred genres..."
          mb={12}
        ></Autocomplete>

        {errors.map((err) => (
          <SlideFade in={error} unmountOnExit={true}>
            <Alert status="error" mb={2} borderRadius="md" padding={4}>
              {err}
            </Alert>
          </SlideFade>
        ))}

        <VStack w={"100%"}>
          <Button w={"100%"} colorScheme={"yellow"} mb={0} onClick={onOpen}>
            Update Password
          </Button>
          <Button
            w={"100%"}
            colorScheme={"yellow"}
            mb={0}
            onClick={updateProfile}
          >
            Update Profile
          </Button>
          <Divider />
          <Button
            w={"100%"}
            colorScheme={"red"}
            variant="outline"
            onClick={onOpenDelete}
          >
            Delete Profile
          </Button>{" "}
          <Button w={"100%"} variant="solid" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </VStack>
      </CustomContainer>
      <ChangePasswordDialog data={data} isOpen={isOpen} onClose={onClose} />
      <DeleteProfileDialog isOpen={isOpenDelete} onClose={onCloseDelete} />
    </Flex>
  );
}
