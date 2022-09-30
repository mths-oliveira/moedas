import { RepeatIcon, TriangleDownIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { useCurrenciesContext } from "../contexts/currencies-context"

interface TableRowProps {
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

function TableRow({ children }: TableRowProps) {
  return (
    <Box
      display="table-row"
      padding="0.75rem 1rem"
      _hover={{
        bg: "transparent.white",
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
          color: "white",
        },
        "&>:last-child": {
          paddingRight: "1rem",
          paddingLeft: "0.25rem",
          textAlign: "end",
        },
      }}
    >
      {children}
    </Box>
  )
}

function formatValue(value: number) {
  const valueFormatted = value.toFixed(2).replace(".", ",")
  return valueFormatted
}

export default function () {
  const { currency } = useCurrenciesContext()
  const router = useRouter()
  return (
    <>
      <Flex
        alignItems="center"
        marginY="1rem"
        onClick={() => {
          router.push("/moedas")
        }}
      >
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

      <Box display="table" width="100%">
        <TableRow>
          <Box>WOL</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatValue(products.wol.monthlyPayment / currency.value)}</Box>
        </TableRow>
        <TableRow>
          <Box>MP WOL</Box>
          <Box>{currency.symbol}</Box>
          <Box>
            {formatValue(
              products.wol.multiprofile.monthlyPayment / currency.value
            )}
          </Box>
        </TableRow>
        <TableRow>
          <Box>LIVE - Matrícula</Box>
          <Box>{currency.symbol}</Box>
          <Box>{formatValue(products.live.enrolmentFee / currency.value)}</Box>
        </TableRow>
        <TableRow>
          <Box>LIVE - Mensalidade</Box>
          <Box>{currency.symbol}</Box>
          <Box>
            {formatValue(products.live.monthlyPayment / currency.value)}
          </Box>
        </TableRow>
        <TableRow>
          <Box>MP LIVE - Matrícula</Box>
          <Box>{currency.symbol}</Box>
          <Box>
            {formatValue(
              products.live.multiprofile.enrolmentFee / currency.value
            )}
          </Box>
        </TableRow>
        <TableRow>
          <Box>MP LIVE - Mensalidade</Box>
          <Box>{currency.symbol}</Box>
          <Box>
            {formatValue(
              products.live.multiprofile.monthlyPayment / currency.value
            )}
          </Box>
        </TableRow>
      </Box>
    </>
  )
}
