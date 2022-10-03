import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { removeAccent } from "../utils/remove-accent"

interface CurrencyProfileProps {
  currency: {
    countries: string[]
    name: string
    code: string
  }
  children?: ReactNode
}

export function CurrencyProfile({ currency, children }: CurrencyProfileProps) {
  const flag = removeAccent(currency.countries[0])
    .replace(/\W/g, "-")
    .toLowerCase()
  return (
    <Flex alignItems="center" cursor="pointer">
      <Box position="relative" marginX="1rem">
        <Image
          src={`./${flag}.png`}
          alt={currency.name}
          filter="drop-shadow(0 0 8px rgba(0,0,0,0.25))"
        />
        {children}
      </Box>
      <Box>
        <Text fontWeight="bold">{currency.code}</Text>
        <Text>{currency.name}</Text>
      </Box>
    </Flex>
  )
}
