import { Flex, Grid, GridItem } from "@chakra-ui/react";
import DashboardMain from "../components/DashboardMain";
import DashboardSidebar from "../components/DashboardSidebar";

export default function Login({ props }) {
  return (
    <Flex w="100%" minH="100svh">
      <Grid
        w="100%"
        h="100svh"
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(6, 1fr)"
      >
        <GridItem
          colSpan={{ base: "6", sm: "3", md: "2", lg: "1" }}
          rowSpan={{ base: "2", sm: "" }}
        >
          <DashboardSidebar />
        </GridItem>
        <GridItem
          colSpan={{ base: "6", sm: "3", md: "4", lg: "5" }}
          rowSpan={{ base: "4", sm: "" }}
        >
          <DashboardMain />
        </GridItem>
      </Grid>
    </Flex>
  );
}
