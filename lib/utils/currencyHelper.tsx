import { Currency } from "@/lib/definitions";

//based on client config to display currency symbol
export function getCurrencySymbol(currency: string) {
  let currencySetting = Currency["NZD"];
  if (Currency[currency]) {
    currencySetting = Currency[currency];
  }
  return {
    symbol: currencySetting.symbol,
    direction: currencySetting.direction,
  };
}

// simple division here to convert to dollar
export const calculateSubunitToUnit = (num: number) => {
  return num ? num / 100 : 0;
};

// convert to dollar with symbol
export const convertToCurrencyUnit = (
  num: number | undefined,
  symbol?: string,
  direction?: string,
) => {
  const number = num ? num / 100 : 0;
  let format = "";

  format = number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;

  if (!symbol) {
    return format;
  }
  return symbol
    ? direction === "RTL"
      ? format + symbol
      : symbol + format
    : format;
};

// convert to unit
export const convertToUnit = (num: number | undefined) => {
  const number = num ? num / 100 : 0;
  return roundNumber(number);
};

//round number to avoid precision issue
export const roundNumber = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
