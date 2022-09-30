import { Currency } from "../contexts/currencies-context"

export function currencyMask(currency: Currency) {
  const valueFormatted = currency.value.toFixed(2).replace(".", ",")
  return `${currency.symbol} ${valueFormatted}`
}
