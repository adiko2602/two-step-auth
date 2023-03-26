import { Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export default function Login({ props }) {
  return (
    <Flex w="100%" align="center" justify="center" minH="100svh">
      <LoginForm />
    </Flex>
  );
}
