import "../styles/globals.css";
import {ChakraProvider} from "@chakra-ui/react";
import {Navbar} from "../Components/Reusable";
import { extendTheme } from "@chakra-ui/react"

function MyApp({Component, pageProps}) {
 
const theme = extendTheme({
  colors: {
    brand: {
      100: "#322659",
      // ...
      900: "#ffffff",
    },
  },
})

  return (
    <ChakraProvider theme={theme}>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
