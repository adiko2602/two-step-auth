const INITIAL_COUNT_DOWN = 180; // time that temp jwt is valid for

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { Link as LinkRouter, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Token } from "../services/Auth";

export default function LoginTokenForm({ props }) {
  const [countdown, setCountdown] = useState(INITIAL_COUNT_DOWN);
  const [errors, setErrors] = useState({
    token: "",
    countdown: "",
    invalidTotp: "",
  });

  const navigate = useNavigate();
  const token = useRef(null);
  const location = useLocation();
  const [jwt] = useState(location.state.jwt);

  async function handleToken(e) {
    e.preventDefault();
    console.log(token.current.value);

    const res = await Token(token.current.value, jwt);
    console.log(res);

    if (res.status == false) {
      setErrors({
        ...errors,
        invalidTotp: "Niepoprawny kod",
      });
      return;
    } else {
      navigate("/dashboard");
    }
  }

  function handleCountdown(interval) {
    if (countdown <= 0) {
      clearInterval(interval);
      setErrors({
        ...errors,
        countdown: "Minął czas na wpisanie tokenu, zaloguj się ponownie",
      });
      return;
    }
    setCountdown((c) => c - 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleCountdown(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

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
      {countdown ? (
        <Text>Token został wysłany. Sprawdź swój adres email.</Text>
      ) : (
        <Text>
          Upłynął czas na wpisanie tokenu.
          <br />
          <Link color="green" as={LinkRouter} to="/login">
            Zaloguj się ponownie
          </Link>
        </Text>
      )}

      <FormControl id="token">
        <FormLabel>Token</FormLabel>
        <Input
          disabled={!countdown}
          ref={token}
          placeholder={
            countdown ? `Oczekiwanie na token ${countdown} s` : "Czas upłynął"
          }
          type="text"
        />
      </FormControl>
      <Button
        isDisabled={!countdown}
        type="button"
        colorScheme="green"
        onClick={handleToken}
      >
        Zaloguj
      </Button>
      {errors.invalidTotp != '' ? <Flex color='red'>{errors.invalidTotp}</Flex> : ''}
    </Flex>
  );
}
