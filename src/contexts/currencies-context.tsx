import { createContext, ReactNode, useContext, useState } from "react"

interface Context {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export interface Currency {
  code: string
  flag: string
  name: string
  symbol: string
  value: number
}

const currenciesContext = createContext({} as Context)

interface Props {
  children: ReactNode
}

const real: Currency = {
  code: "BRL",
  flag: "009-brasil.png",
  name: "Real Brasileiro",
  symbol: "R$",
  value: 1,
}

export async function getCurrencyQuoteByCode(code: string) {
  const isDollarQuote = code === "USD"
  let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  if (!isDollarQuote) url += `,USD-${code}`
  const response = await fetch(url)
  const data = await response.json()
  const dollarPurchaseValue = Number(data["USDBRL"].bid)
  if (isDollarQuote) return dollarPurchaseValue
  const currencySaleValue = Number(data[`USD${code}`].ask)
  const currencyQuote = dollarPurchaseValue / currencySaleValue
  return currencyQuote
}

export function CurrenciesContextProvider({ children }: Props) {
  const [currency, setCurrency] = useState<Currency>(real)
  return (
    <currenciesContext.Provider value={{ currency, setCurrency }}>
      {children}
    </currenciesContext.Provider>
  )
}

export function useCurrenciesContext() {
  const context = useContext(currenciesContext)
  return context
}
