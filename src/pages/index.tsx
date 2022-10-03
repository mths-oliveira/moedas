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
      _hover={{
        bg: "secondary",
      }}
      sx={{
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
  const { toggleColorMode, colorMode } = useColorMode()
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
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/moedas">
          <Flex alignItems="center" marginY="1rem">
            <Box position="relative" marginX="1rem">
              <Image
                src={currency.src}
                alt={currency.name}
                filter="drop-shadow(0 0 8px rgba(0,0,0,0.25))"
              />
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
            </Box>
            <Stack spacing="0">
              <Text fontWeight="bold">{currency.code}</Text>
              <Text>{currency.name}</Text>
            </Stack>
          </Flex>
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
