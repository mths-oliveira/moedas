import Link from "next/link"
import { RepeatIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  Tab,
  Tooltip,
  BoxProps,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { useCurrenciesContext } from "../contexts/currencies-context"

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

function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <Box
      display="table-row"
      padding="0.75rem 1rem"
      color="white"
      sx={{
        "&:nth-child(odd)": {
          bg: "transparent.white",
        },
        "&>div": {
          display: "table-cell",
          paddingY: "0.75rem",
        },
        "&>:first-child": {
          paddingX: "1rem",
          width: "100%",
        },
        "&>:not(:first-child)": {
          fontWeight: "bold",
          whiteSpace: "nowrap",
        },
        "&>:last-child": {
          paddingRight: "1rem",
          paddingLeft: "0.25rem",
          textAlign: "end",
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default function () {
  const { currency } = useCurrenciesContext()
  function formatCurrency(value: number) {
    if (currency.code !== "BRL") {
      value = value / currency.value
    }
    const currencyValue = value
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: currency.code,
        currencyDisplay: "code",
      })
      .replace(currency.code, "")
    return currencyValue
  }
  return (
    <>
      <Link href="/moedas">
        <Flex alignItems="center" marginY="1rem">
          <Box position="relative" marginX="1rem">
            <Image src={currency.src} alt={currency.name} />
            <Center
              height="1.5rem"
              width="1.5rem"
              borderRadius="full"
              bg="gray.dark"
              position="absolute"
              bottom="0.25rem"
              right="-0.25rem"
            >
              <Icon as={RepeatIcon} />
            </Center>
          </Box>
          <Stack spacing="0">
            <Text color="white" fontWeight="semibold">
              {currency.code}
            </Text>
            <Text>{currency.name}</Text>
          </Stack>
        </Flex>
      </Link>

      <Box display="table" width="100%">
        <TableRow>
          <Box>Wol</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.wol.monthlyPayment)}</Box>
        </TableRow>
        <TableRow>
          <Box>Multi Wol</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.wol.multiprofile.monthlyPayment)}</Box>
        </TableRow>
        <TableRow>
          <Box>Live - Matrícula</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.live.enrolmentFee)}</Box>
        </TableRow>
        <TableRow>
          <Box>Live - Mensalidade</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.live.monthlyPayment)}</Box>
        </TableRow>
        <TableRow>
          <Box>Multi Live - Matrícula</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.live.multiprofile.enrolmentFee)}</Box>
        </TableRow>
        <TableRow>
          <Box>Multi Live - Mensalidade</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatCurrency(products.live.multiprofile.monthlyPayment)}</Box>
        </TableRow>
      </Box>
    </>
  )
}
