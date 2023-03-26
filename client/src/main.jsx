import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import "./index.css";
import { Box, ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Box minW="100%" minH="100svh">
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
