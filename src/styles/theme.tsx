import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    gray: {
      dark: "#282828",
      light: "rgba(255,255,255,0.9)",
    },
    transparent: {
      white: "rgba(255,255,255,0.1)",
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
        color: "gray.light",
        bg: "gray.dark",
        scrollBehavior: "smooth",
      },
    },
  },
})
