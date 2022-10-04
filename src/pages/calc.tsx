import Link from "next/link"
import { MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Icon,
  Stack,
  BoxProps,
  useColorMode,
  Checkbox,
  Divider,
  Accordion,
} from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { CurrencyProfile } from "../components/currency-profile"
import { AccordionItem, Products } from "../components/accordion-item"

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

const initialSelectedProducts = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}

const months = []
const date = new Date()
for (const _ of Array(3).fill(0)) {
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
  })
  months.push(month)
  date.setMonth(date.getMonth() + 1)
}

export default function () {
  const listProducts: Products[][] = Array(3).fill([])
  const { toggleColorMode, colorMode } = useColorMode()
  const { currency } = useCurrenciesContext()
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  )

  if (selectedProducts["wol"]) {
    for (const i in listProducts) {
      listProducts[i] = [
        ...listProducts[i],
        {
          name: "Wol",
          value: products.wol.monthlyPayment,
        },
      ]
    }
  }
  if (selectedProducts["mp_wol"]) {
    for (const i in listProducts) {
      listProducts[i] = [
        ...listProducts[i],
        {
          name: "Multi Wol",
          value: products.wol.multiprofile.monthlyPayment,
        },
      ]
    }
  }
  if (selectedProducts["live"]) {
    listProducts[0] = [
      ...listProducts[0],
      {
        name: "Live - Matrícula",
        value: products.live.enrolmentFee,
      },
    ]
    listProducts[2] = [
      ...listProducts[2],
      {
        name: "Live - Mensalidade",
        value: products.live.monthlyPayment,
      },
    ]
  }
  if (selectedProducts["mp_live"]) {
    listProducts[0] = [
      ...listProducts[0],
      {
        name: "Multi Live - Matrícula",
        value: products.live.multiprofile.enrolmentFee,
      },
    ]
    listProducts[2] = [
      ...listProducts[2],
      {
        name: "Multi Live - Mensalidade",
        value: products.live.multiprofile.monthlyPayment,
      },
    ]
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
      <Divider />
      <Box as="form" padding="2rem 1rem" border="1px solid secondary">
        <Stack
          spacing="1rem"
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            setSelectedProducts({
              ...selectedProducts,
              [input.value]: input.checked,
            })
          }}
          sx={{
            "&>label:not(:first-child)": {
              marginLeft: "1.5rem",
            },
          }}
        >
          <Checkbox
            isChecked={Object.values(selectedProducts).every(Boolean)}
            onChange={(e) => {
              e.stopPropagation()
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
      <Accordion allowToggle>
        {months.map((month, i) => (
          <AccordionItem key={month} title={month} products={listProducts[i]} />
        ))}
      </Accordion>
    </>
  )
}
