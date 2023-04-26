import { Flex } from "@chakra-ui/react";
import DisplayQRMain from "../components/DisplayQRMain";

export default function DisplayQR({ props }) {
  return (
    <Flex w="100%" align="center" justify="center" minH="100svh">
      <DisplayQRMain />
    </Flex>
  );
}
