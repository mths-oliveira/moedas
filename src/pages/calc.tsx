import Link from "next/link"
import products from "../../products.json"
import { MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Icon,
  Stack,
  useColorMode,
  Checkbox,
  Accordion,
} from "@chakra-ui/react"
import { useState } from "react"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { CurrencyProfile } from "../components/currency-profile"
import { AccordionItem, Products } from "../components/accordion-item"

interface Data {
  name: string
  products: Product[]
}

interface Product {
  name: string
  value: number
}

const initialSelectedProducts = {
  wol: true,
  wolMultiprofile: false,
  live: false,
  liveMultiprofile: false,
}

const date = new Date()
const firstMonths: Data[] = []
for (let i = 0; i < 3; i++) {
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
  })
  firstMonths[i] = { name: month, products: [] }
  date.setMonth(date.getMonth() + 1)
}

export default function () {
  const { toggleColorMode, colorMode } = useColorMode()
  const { currency } = useCurrenciesContext()
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  )
  if (selectedProducts["wol"]) {
    for (const i in firstMonths) {
      firstMonths[i].products = [
        {
          name: "Wol",
          value: products.wol.monthlyPayment,
        },
      ]
    }
  }
  if (selectedProducts["wolMultiprofile"]) {
    for (const i in firstMonths) {
      firstMonths[i].products.push({
        name: "Multi Wol",
        value: products.wolMultiprofile.monthlyPayment,
      })
    }
  }
  if (selectedProducts["live"]) {
    firstMonths[0].products.push({
      name: "Live - Matrícula",
      value: products.live.enrolmentFee,
    })
    firstMonths[2].products.push({
      name: "Live - Mensalidade",
      value: products.live.monthlyPayment,
    })
  }
  if (selectedProducts["liveMultiprofile"]) {
    firstMonths[0].products.push({
      name: "Multi Live - Matrícula",
      value: products.liveMultiprofile.enrolmentFee,
    })
    firstMonths[2].products.push({
      name: "Multi Live - Mensalidade",
      value: products.liveMultiprofile.monthlyPayment,
    })
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

      <Accordion allowMultiple defaultIndex={[]}>
        {firstMonths.map(({ name, products }) => (
          <AccordionItem key={name} title={name} products={products} />
        ))}
      </Accordion>
      <Box as="form" padding="2rem 1rem" border="1px solid secondary">
        <Stack
          spacing="1rem"
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            if (input.value === "wol") return
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
                wol: true,
                live: input.checked,
                liveMultiprofile: input.checked,
                wolMultiprofile: input.checked,
              })
            }}
          >
            Strike
          </Checkbox>
          <Checkbox value="wol" isChecked={selectedProducts.wol}>
            Wol
          </Checkbox>
          <Checkbox
            value="wolMultiprofile"
            isChecked={selectedProducts.wolMultiprofile}
          >
            Multi Wol
          </Checkbox>
          <Checkbox value="live" isChecked={selectedProducts.live}>
            Live
          </Checkbox>
          <Checkbox
            value="liveMultiprofile"
            isChecked={selectedProducts.liveMultiprofile}
          >
            Multi Live
          </Checkbox>
        </Stack>
      </Box>
    </>
  )
}
