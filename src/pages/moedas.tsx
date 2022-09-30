import {
  Center,
  Flex,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { Search2Icon, ArrowBackIcon } from "@chakra-ui/icons"
import { currencies } from "../../currencies.json"
import { removeAccent } from "../utils/remove-accent"
import { debounce } from "../utils/debounce"
import {
  getCurrencyQuoteByCode,
  useCurrenciesContext,
} from "../contexts/currencies-context"

interface Currency {
  code: string
  name: string
  flag: string
}

export default function () {
  const router = useRouter()
  const { setCurrency } = useCurrenciesContext()
  const [value, setValue] = useState("")
  function filterCurrenciesByNameOrCode(currency: Currency) {
    const regexp = new RegExp(removeAccent(value), "i")
    return (
      removeAccent(currency.code).match(regexp) ||
      removeAccent(currency.name).match(regexp)
    )
  }
  return (
    <>
      <Flex
        color="white"
        bg="gray.dark"
        align="center"
        padding="1rem"
        position="sticky"
        top="0"
      >
        <Center as="button" height="3rem" width="4rem" onClick={router.back}>
          <Icon as={ArrowBackIcon} fontSize="1.5rem" />
        </Center>
        <Flex
          height="3rem"
          align="center"
          bg="transparent.white"
          borderRadius="5px"
          flexGrow={1}
        >
          <Input
            bg="transparent"
            border="none"
            textTransform="capitalize"
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
      <List width="100%">
        {currencies
          .filter(filterCurrenciesByNameOrCode)
          .map(({ code, flag, name, symbol }) => (
            <ListItem
              key={code}
              display="flex"
              alignItems="center"
              cursor="pointer"
              _hover={{
                bg: "transparent.white",
              }}
              onClick={async () => {
                const value = await getCurrencyQuoteByCode(code)
                setCurrency({
                  code,
                  flag,
                  name,
                  symbol,
                  value,
                })
                router.push("/")
              }}
            >
              <Image src={flag} marginX="1rem" />
              <Stack spacing="0">
                <Text color="white" fontWeight="semibold">
                  {code}
                </Text>
                <Text>{name}</Text>
              </Stack>
            </ListItem>
          ))}
      </List>
    </>
  )
}
