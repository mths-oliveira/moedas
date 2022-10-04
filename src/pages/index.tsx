import Link from "next/link"
import { MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Icon,
  BoxProps,
  useColorMode,
} from "@chakra-ui/react"
import { ReactNode } from "react"
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
      <Link href="/calc">
        <Box display="table" width="100%">
          <TableRow>
            <Box>Wol</Box>
            <Box>{currency.symbol}</Box>
            <Box>{formatCurrency(products.wol.monthlyPayment)}</Box>
          </TableRow>
          <TableRow>
            <Box>Multi Wol</Box>
            <Box>{currency.symbol}</Box>
            <Box>
              {formatCurrency(products.wol.multiprofile.monthlyPayment)}
            </Box>
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
            <Box>
              {formatCurrency(products.live.multiprofile.monthlyPayment)}
            </Box>
          </TableRow>
        </Box>
      </Link>
    </>
  )
}
