/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import CustomContainer from "@/components/CustomContainer";
import { UserManagementState } from "@/services/UserManagementService/UserManagementEnum";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const toast = useToast();

  const validateEmail = (email: string) => {
    // reference: https://regexr.com/3e48o
    const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  const sendEmail = async (event: any) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        status: "error",
        duration: 5000,
      });
    } else {
      const userManagementService = new UserManagementService();

      {
        const message = await userManagementService.resetPassword(email);
        if (
          message === UserManagementState.PasswordResetFailedUserDoesNotExist
        ) {
          toast({
            title: "Error",
            description: "Sorry, can't find any such user :(",
            status: "error",
            duration: 5000,
          });
        } else {
          toast({
            title: "Email sent",
            description: "Please check your email for the reset link",
            status: "success",
            duration: 5000,
          });
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
            <Heading>Reset Password</Heading>
            <Text
              color="gray.500"
              fontSize="sm"
              width={"300px"}
              textAlign="center"
            >
              Enter your email address and we'll send you a temporary password
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
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>

        <Button colorScheme="yellow" onClick={sendEmail}>
          Send Password Reset Email
        </Button>
      </CustomContainer>
    </Flex>
  );
}
