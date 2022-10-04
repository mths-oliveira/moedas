import Link from "next/link"
import products from "../../products.json"
import { MoonIcon, RepeatIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Center, Flex, Icon, useColorMode } from "@chakra-ui/react"
import { useCurrenciesContext } from "../contexts/currencies-context"
import { CurrencyProfile } from "../components/currency-profile"
import { TableRow } from "../components/table-row"

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
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingY="1rem"
        borderBottom="1px solid transparent"
        borderColor="inherit"
      >
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
            <Box>{formatCurrency(products.wolMultiprofile.monthlyPayment)}</Box>
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
            <Box>{formatCurrency(products.liveMultiprofile.enrolmentFee)}</Box>
          </TableRow>
          <TableRow>
            <Box>Multi Live - Mensalidade</Box>
            <Box>{currency.symbol}</Box>
            <Box>
              {formatCurrency(products.liveMultiprofile.monthlyPayment)}
            </Box>
          </TableRow>
        </Box>
      </Link>
    </>
  )
}
