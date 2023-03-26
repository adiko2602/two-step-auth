import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useRef } from "react";

export default function LoginTokenForm({ props }) {
  const navigate = useNavigate();
  const token = useRef(null);

  function handleToken(e) {
    e.preventDefault();
    console.log(token.current.value);

    navigate("/dashboard");
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
      <Heading size="md">Wpisz token</Heading>
      <Text>Token został wysłany. Sprawdź swój adres email.</Text>
      <FormControl id="token">
        <FormLabel>Token</FormLabel>
        <Input ref={token} placeholder="Wpisz token" type="text" />
      </FormControl>
      <Button type="button" colorScheme="green" onClick={handleToken}>
        Zaloguj
      </Button>
    </Flex>
  );
}
