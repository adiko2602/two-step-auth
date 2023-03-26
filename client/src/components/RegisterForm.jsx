import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import Validator from "../helpers/Validator";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Register } from "../services/Auth";

export default function RegisterForm({ props }) {
  const navigate = useNavigate();
  const validator = new Validator();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordReplay: "",
  });
  const email = useRef(null);
  const password = useRef(null);
  const passwordReplay = useRef(null);

  async function handleRegister(e) {
    e.preventDefault();
    let tempErrors = { email: "", password: "", passwordReplay: "" };

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
    if (
      !validator.passwordEqual(
        password.current.value,
        passwordReplay.current.value
      )
    ) {
      tempErrors = { ...tempErrors, passwordReplay: "Hasła nie są takie same" };
      setErrors(tempErrors);
      return;
    }
    setErrors(tempErrors);

    const res = await Register(email.current.value, password.current.value);
    console.log(res);

    navigate("/login");
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
      <Heading size="md">Zarejestruj się</Heading>
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
      <FormControl
        id="password-replay"
        isInvalid={errors.passwordReplay.length > 0}
      >
        <FormLabel>Powtórz hasło</FormLabel>
        <Input
          ref={passwordReplay}
          placeholder="Powtórz hasło"
          type="password"
        />
        <FormErrorMessage>{errors.passwordReplay}</FormErrorMessage>
      </FormControl>
      <Button type="button" colorScheme="green" onClick={handleRegister}>
        Zarejestruj
      </Button>
    </Flex>
  );
}
