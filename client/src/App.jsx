import { Flex, Button, Heading, Text, Link } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

export default function App() {
  return (
    <Flex align="center" justify="center" minH="100svh">
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
        <Heading size="lg">
          Witaj w aplikacji, która prezentuje działanie dwuetapowego logowania.
        </Heading>
        <Text>Spróbuj się zalogować lub zarejestrować.</Text>
        <Flex gap="2rem">
          <Link as={LinkRouter} to="/login" w="100%">
            <Button w="100%" colorScheme="green" variant="solid" type="button">
              Zaloguj
            </Button>
          </Link>

          <Link as={LinkRouter} to="/register" w="100%">
            <Button
              w="100%"
              colorScheme="green"
              variant="outline"
              type="button"
            >
              Zarejestruj
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
