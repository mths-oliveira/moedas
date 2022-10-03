import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#565857",
        _dark: "#FFF",
      },
      primary: {
        default: "#FFF",
        _dark: "#282828",
      },
      secondary: {
        default: "#F0F0F0",
        _dark: "#000",
      },
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  styles: {
    global: {
      "html, body": {
        color: "text",
        bg: "primary",

        scrollBehavior: "smooth",
      },
    },
  },
})
