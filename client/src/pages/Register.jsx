import { Flex } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export default function Register({ props }) {
  return (
    <Flex w="100%" align="center" justify="center" minH="100svh">
      <RegisterForm />
    </Flex>
  );
}
