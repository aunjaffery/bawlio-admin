import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    200: "#c73832",
    100: "#26394B",
  },
  sec: {
    100: "#18cdc4",
    //sec headings
    200: "#2bbdb9",
    //input borders
    300: "#337ab7",
  },
  border: {
    100: "#cedcdc",
  },
  bg: {
    100: "#eee",
    //drawer bg
    200: "#eef1f5",
    300: "#f6f7f9",
  },
  footer: {
    100: "#f5f5f7",
  },
};

const Button = {
  variants: {
    solid: {
      _active: { outline: "none !important" },
      _focus: { boxShadow: "none" },
    },
  },
};

const theme = extendTheme({ colors, components: { Button } });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

