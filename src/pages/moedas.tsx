import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Search2Icon, ArrowBackIcon } from "@chakra-ui/icons"
import { currencies } from "../../currencies.json"
import { removeAccent } from "../utils/remove-accent"
import { ReactNode, useState } from "react"
import { debounce } from "../utils/debounce"
import {
  getCurrencyQuoteByCode,
  useCurrenciesContext,
} from "../contexts/currencies-context"
import { CurrencyProfile } from "../components/currency-profile"

export default function () {
  const router = useRouter()
  const [value, setValue] = useState("")
  const { setCurrency } = useCurrenciesContext()
  return (
    <>
      <Flex
        bg="primary"
        align="center"
        padding="1rem"
        position="sticky"
        top="0"
        zIndex={1}
        borderBottom="1px solid transparent"
        borderColor="inherit"
      >
        <Center as="button" height="3rem" width="4rem" onClick={router.back}>
          <Icon as={ArrowBackIcon} fontSize="1.5rem" />
        </Center>
        <Flex
          height="3rem"
          align="center"
          bg="secondary"
          borderRadius="full"
          paddingX="0.5rem"
          flexGrow={1}
        >
          <Input
            bg="transparent"
            border="none"
            textTransform="capitalize"
            placeholder="Pesquise o Nome ou Codigo da Moeda"
            _placeholder={{
              textTransform: "initial",
            }}
            _focus={{
              boxShadow: "none",
            }}
            onChange={(e) => {
              debounce(() => {
                setValue(e.target.value)
              })
            }}
          />
          <Icon as={Search2Icon} marginX="1rem" />
        </Flex>
      </Flex>
      <List
        width="100%"
        ref={(ref) => {
          if (!ref) return
          const regexp = RegExp(removeAccent(value), "i")
          const element: HTMLLIElement = Array.from<any>(ref.childNodes).find(
            (listItem: HTMLLIElement) => {
              const id = listItem.id
              const name = listItem.getAttribute("data-name")
              const match = name.match(regexp) || id.match(regexp)
              return match
            }
          )
          if (!element) return
          const { top } = element.getBoundingClientRect()
          window.scrollBy({
            top: top - 80,
          })
        }}
      >
        {currencies.map((currency) => {
          return (
            <ListItem
              id={currency.code}
              key={currency.code}
              data-name={removeAccent(currency.name)}
              display="flex"
              alignItems="center"
              cursor="pointer"
              _hover={{
                bg: "secondary",
              }}
              onClick={async () => {
                const value = await getCurrencyQuoteByCode(currency.code)
                setCurrency({
                  ...currency,
                  value,
                })
                router.back()
              }}
            >
              <CurrencyProfile currency={currency} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
