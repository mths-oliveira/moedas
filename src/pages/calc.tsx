import Link from "next/link"
import { MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  BoxProps,
  useColorMode,
  Checkbox,
} from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { CurrencyProfile } from "../components/currency-profile"

interface TableRowProps extends BoxProps {
  children: ReactNode
}

const products = {
  wol: {
    monthlyPayment: 138,
    multiprofile: {
      monthlyPayment: 30,
    },
  },
  live: {
    enrolmentFee: 250,
    monthlyPayment: 198,
    multiprofile: {
      enrolmentFee: 60,
      monthlyPayment: 60,
    },
  },
}

const selectedProducts = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}

export default function () {
  const { toggleColorMode, colorMode } = useColorMode()
  const { currency } = useCurrenciesContext()
  const [_, setBool] = useState(true)
  function refresh() {
    setBool((bool) => !bool)
  }
  function formatCurrency(value: number) {
    if (currency.code !== "BRL") {
      value = value / currency.value
    }
    const currencyValue = value
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d+)(\d{3})/, "$1.$2")
    return currencyValue
  }
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" marginY="1rem">
        <Link href="/moedas">
          <Box>
            <CurrencyProfile currency={currency}>
              <Center
                height="1.5rem"
                width="1.5rem"
                borderRadius="full"
                position="absolute"
                bottom="0.25rem"
                right="-0.25rem"
                bg="primary"
              >
                <Icon as={RepeatIcon} />
              </Center>
            </CurrencyProfile>
          </Box>
        </Link>
        <Center
          as="button"
          bg="secondary"
          padding="1rem"
          margin="1rem"
          borderRadius="8px"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "dark" ? MoonIcon : SunIcon}
            fontSize="1.25rem"
          />
        </Center>
      </Flex>
      <Box as="form" paddingX="1rem">
        <Checkbox
          isChecked={Object.values(selectedProducts).every(Boolean)}
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            Object.keys(selectedProducts).forEach((product) => {
              selectedProducts[product] = input.checked
            })
            refresh()
          }}
        >
          Strike
        </Checkbox>
        <Stack
          spacing="1rem"
          margin="1rem 0 0 1.5rem"
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            selectedProducts[input.value] = input.checked
            refresh()
          }}
        >
          <Checkbox value="wol" isChecked={selectedProducts.wol}>
            Wol
          </Checkbox>
          <Checkbox value="mp_wol" isChecked={selectedProducts.mp_wol}>
            Multi Wol
          </Checkbox>
          <Checkbox value="live" isChecked={selectedProducts.live}>
            Live{" "}
          </Checkbox>
          <Checkbox value="mp_live" isChecked={selectedProducts.mp_live}>
            Multi Live{" "}
          </Checkbox>
        </Stack>
      </Box>
    </>
  )
}
