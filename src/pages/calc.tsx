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
  Grid,
} from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"
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

interface Products<T = any> {
  wol: T
  mp_wol: T
  live: T
  mp_live: T
}

const date = new Date()
const months: string[] = []
for (const _ of Array(3).fill(0)) {
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
  })
  date.setMonth(date.getMonth() + 1)
  months.push(month)
}

const initialSelectedProducts: Products<boolean> = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}

const productValues: Products<number[]> = {
  wol: Array(3).fill(products.wol.monthlyPayment),
  mp_wol: Array(3).fill(products.wol.multiprofile.monthlyPayment),
  live: [products.live.enrolmentFee, 0, products.live.monthlyPayment],
  mp_live: [
    products.live.multiprofile.enrolmentFee,
    0,
    products.live.multiprofile.monthlyPayment,
  ],
}

export default function () {
  const { toggleColorMode, colorMode } = useColorMode()
  const { currency, formatCurrency } = useCurrenciesContext()
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  )
  const productValuesPerMonth: number[] = Array(3).fill(0)
  for (const productName in selectedProducts) {
    if (selectedProducts[productName]) {
      productValuesPerMonth[0] += productValues[productName][0]
      productValuesPerMonth[1] += productValues[productName][1]
      productValuesPerMonth[2] += productValues[productName][2]
    }
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
      <Grid
        padding="1rem"
        paddingTop="0"
        gap="0.5rem"
        gridTemplateColumns="repeat(3, auto)"
        justifyContent="space-between"
        textAlign="center"
      >
        {months.map((month) => (
          <Box textTransform="capitalize" key={month}>
            {month}
          </Box>
        ))}
        {productValuesPerMonth.map((value, i) => (
          <Text key={i} fontWeight="bold">
            {`${currency.symbol} ${formatCurrency(value)}`}
          </Text>
        ))}
      </Grid>
      <Box as="form" padding="1rem">
        <Checkbox
          isChecked={Object.values(selectedProducts).every(Boolean)}
          onChange={(e) => {
            const input = e.target as HTMLInputElement

            setSelectedProducts({
              live: input.checked,
              mp_live: input.checked,
              mp_wol: input.checked,
              wol: true,
            })
          }}
        >
          Strike
        </Checkbox>
        <Stack
          spacing="1rem"
          margin="1rem 0 0 1.5rem"
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            setSelectedProducts({
              ...selectedProducts,
              [input.value]: input.checked,
            })
          }}
        >
          <Checkbox value="wol" isChecked={selectedProducts.wol}>
            Wol
          </Checkbox>
          <Checkbox value="mp_wol" isChecked={selectedProducts.mp_wol}>
            Multi Wol
          </Checkbox>
          <Checkbox value="live" isChecked={selectedProducts.live}>
            Live
          </Checkbox>
          <Checkbox value="mp_live" isChecked={selectedProducts.mp_live}>
            Multi Live
          </Checkbox>
        </Stack>
      </Box>
    </>
  )
}
