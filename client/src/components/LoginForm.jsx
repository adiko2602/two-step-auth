import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import { useRef } from "react";
import { useNavigate } from "react-router";

export default function LoginForm({ props }) {
  const login = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    console.log(login.current.value);
    console.log(password.current.value);
    navigate("token");
  }

  return (
    <Flex
      maxW="500px"
      w="100%"
      rounded="1rem"
      p="2rem"
      direction="column"
      gap="2rem"
      border="1px"
      borderColor="gray.200"
    >
      <Heading size="md">Zaloguj się</Heading>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input ref={login} placeholder="Adres email" type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Hasło</FormLabel>
        <Input ref={password} placeholder="Hasło" type="password" />
      </FormControl>
      <Button type="button" colorScheme="green" onClick={handleLogin}>
        Zaloguj
      </Button>
    </Flex>
  );
}
