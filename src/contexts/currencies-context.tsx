import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface Context {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatCurrency: (values: number) => string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  countries: string[]
  value: number
}

const currenciesContext = createContext({} as Context)

interface Props {
  children: ReactNode
}

const real: Currency = {
  code: "BRL",
  name: "Real Brasileiro",
  symbol: "R$",
  value: 1,
  countries: ["Brasil"],
}

export function CurrenciesContextProvider({ children }: Props) {
  const [currency, setCurrency] = useState<Currency>(real)
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
  useEffect(() => {
    const currency: Currency = JSON.parse(localStorage.getItem("currency"))
    if (!currency) return
    getCurrencyQuoteByCode(currency.code).then((value) => {
      currency.value = value
      setCurrency(currency)
    })
  }, [])
  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency))
  }, [currency])
  return (
    <currenciesContext.Provider
      value={{ currency, setCurrency, formatCurrency }}
    >
      {children}
    </currenciesContext.Provider>
  )
}

export function useCurrenciesContext() {
  const context = useContext(currenciesContext)
  return context
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
