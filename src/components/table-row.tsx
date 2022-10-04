import { Box, TableRowProps } from "@chakra-ui/react"

export function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <Box
      display="table-row"
      _hover={{
        bg: "secondary",
      }}
      sx={{
        "&>div": {
          display: "table-cell",
          paddingY: "0.75rem",
        },
        "&>:first-of-type": {
          paddingX: "1rem",
          width: "100%",
        },
        "&>:not(:first-of-type)": {
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
