import Head from "next/head"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { CurrenciesContextProvider } from "../contexts/currencies-context"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WSP</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CurrenciesContextProvider>
          <Component {...pageProps} />
        </CurrenciesContextProvider>
      </ChakraProvider>
    </>
  )
}
