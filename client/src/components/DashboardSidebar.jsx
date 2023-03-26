import { Button, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const itemsForList = ["Strona główna", "Wiadomości", "Profil"];

export default function DashboardSidebar({ props }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <Flex
      borderRight="1px"
      borderColor="gray.200"
      minH={{ base: "", sm: "100svh" }}
      direction="column"
    >
      <Flex
        mb="1rem"
        p="1rem"
        justify="space-between"
        align="center"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Heading size="sm">"userEmail"</Heading>
        <Button
          onClick={handleLogout}
          size="sm"
          type="button"
          colorScheme="green"
          variant="outline"
        >
          Wyloguj
        </Button>
      </Flex>
      <List w="100%">
        {itemsForList.map((item) => (
          <ListItem
            key={item}
            p="1rem"
            _hover={{ bgColor: "gray.100" }}
            cursor="pointer"
          >
            {item}
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
