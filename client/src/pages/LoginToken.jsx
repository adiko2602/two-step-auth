import { Flex } from "@chakra-ui/react";
import LoginTokenForm from "../components/LoginTokenForm";

export default function LoginToken({ props }) {
  return (
    <Flex w="100%" align="center" justify="center" minH="100svh">
      <LoginTokenForm />
    </Flex>
  );
}
