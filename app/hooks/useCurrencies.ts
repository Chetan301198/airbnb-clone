import countries from "world-countries";
import axios from "axios";
import { useEffect, useState } from "react";

interface Info {
  country: string;
  country_name: string;
  currency: string;
  currency_name: string;
}

export const allCurrencies = countries.map((c) => ({
  name: c.name.common,
  currency: Object.values(c.currencies)[0],
}));

export const getCurrency = (value: string) => {
  const currency = allCurrencies.find(
    (c) => c.name.toLowerCase() === value.toLowerCase()
  );

  return currency?.currency;
};

export const getCurrencyDetails = ({
  fromCurrency,
  price,
}: {
  fromCurrency?: string;
  price?: number;
}) => {
  const [data, setData] = useState<Info | null>();
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    axios("https://ipapi.co/json").then((res) => setData(res.data));
  }, []);

  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: {
      from: fromCurrency,
      to: data?.currency,
      q: 1,
    },
    headers: {
      "X-RapidAPI-Key": "2f349fd28dmshc0826ea7a65ca4cp16adf6jsn4488d0df262b",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios.request(options).then((res) => setRate(res.data));
  }, [fromCurrency, data?.country]);

  console.log(rate, data, fromCurrency);

  return (
    data && {
      symbol: getCurrency(data?.country_name)?.symbol || "$",
      value: Math.round(rate * (price || 1)),
    }
  );
};
