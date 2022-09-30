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
import { Search2Icon, ArrowBackIcon } from "@chakra-ui/icons"
import { currencies } from "../../currencies.json"
import { removeAccent } from "../utils/remove-accent"
import { useState } from "react"
import { debounce } from "../utils/debounce"

interface Currency {
  code: string
  countries: string[]
  name: string
  symbol: string
}

export default function () {
  const router = useRouter()
  const [value, setValue] = useState("")
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
          borderRadius="full"
          paddingX="0.25rem"
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
        {currencies.map(({ code, name, countries }) => {
          const flag = removeAccent(countries[0])
            .replace(/\W/g, "-")
            .toLowerCase()
          return (
            <ListItem
              id={code}
              data-name={removeAccent(name)}
              key={code}
              display="flex"
              alignItems="center"
              cursor="pointer"
              _hover={{
                bg: "transparent.white",
              }}
            >
              <Image src={`./${flag}.png`} alt={`${name}`} marginX="1rem" />
              <Stack spacing="0">
                <Text color="white" fontWeight="semibold">
                  {code}
                </Text>
                <Text>{name}</Text>
              </Stack>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
