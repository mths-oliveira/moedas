import { Box, Flex, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { currencyMask } from "../utils/currency-mask"

export default function () {
  const router = useRouter()
  const { currency } = useCurrenciesContext()
  return (
    <Box onClick={() => [router.push("/moedas")]}>
      <Heading>{currencyMask(currency)}</Heading>
    </Box>
  )
}
