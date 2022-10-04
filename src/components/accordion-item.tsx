import {
  AccordionItem as AccordionWraper,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  AccordionItemProps,
} from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { TableRow } from "./table-row"

const date = new Date()
const months: string[] = []
for (const _ of Array(3).fill(0)) {
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
  })
  date.setMonth(date.getMonth() + 1)
  months.push(month)
}

interface Props extends AccordionItemProps {
  title: string
  products: Products[]
}

export interface Products {
  name: string
  value: number
}

export function AccordionItem({ products, title }: Props) {
  const { currency, formatCurrency } = useCurrenciesContext()
  let total = 0
  for (const product of products) {
    total += product.value
  }
  return (
    <AccordionWraper pointerEvents={products.length ? "initial" : "none"}>
      <h2>
        <AccordionButton
          padding="0.75rem 1rem"
          _hover={{}}
          _expanded={{
            bg: "secondary",
          }}
        >
          <Flex
            flex="1"
            textAlign="left"
            textTransform="capitalize"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing="1rem">
              <Icon as={CalendarIcon} />
              <Text>{title}</Text>
            </Stack>
            <Text fontWeight="bold">{`${currency.symbol} ${formatCurrency(
              total
            )}`}</Text>
          </Flex>
          <AccordionIcon
            fontSize="1.5rem"
            marginLeft="0.5rem"
            marginRight="-0.25rem"
          />
        </AccordionButton>
      </h2>
      <AccordionPanel padding="0.75rem 0">
        <Box display="table" width="100%">
          {products.map((product) => (
            <TableRow key={product.name + title}>
              <Box>{product.name}</Box>
              <Box>{currency.symbol}</Box>
              <Box>{formatCurrency(product.value)}</Box>
            </TableRow>
          ))}
        </Box>
      </AccordionPanel>
    </AccordionWraper>
  )
}
