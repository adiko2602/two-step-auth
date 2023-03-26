import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Validator from "../helpers/Validator";
import { Login } from "../services/Auth";

export default function LoginForm({ props }) {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const validator = new Validator();

  async function handleLogin(e) {
    e.preventDefault();
    let tempErrors = { email: "", password: "" };

    if (!validator.email(email.current.value)) {
      tempErrors = { ...tempErrors, email: "Nieprawidłowy adres email" };
      setErrors(tempErrors);
      return;
    }
    if (!validator.password(password.current.value)) {
      tempErrors = {
        ...tempErrors,
        password: "Hasło musi zawierać minimum 8 znaków",
      };
      setErrors(tempErrors);
      return;
    }
    setErrors(tempErrors);

    const res = await Login(email.current.value, password.current.value);
    console.log(res);

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
      <FormControl id="email" isInvalid={errors.email.length > 0}>
        <FormLabel>Email</FormLabel>
        <Input ref={email} placeholder="Adres email" type="email" />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password.length > 0}>
        <FormLabel>Hasło</FormLabel>
        <Input ref={password} placeholder="Hasło" type="password" />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <Button type="button" colorScheme="green" onClick={handleLogin}>
        Zaloguj
      </Button>
    </Flex>
  );
}
