import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;
const BASE_URL = 'https://min-api.cryptocompare.com/data/';

export const getCryptocurrencyPrice = async (symbol: string) => {
  const response = await axios.get(
    `${BASE_URL}price?fsym=${symbol}&tsyms=USD`,
    {
      headers: {
        authorization: `Apikey ${API_KEY}`,
      },
    },
  );
  return response.data.USD;
};

export const getHistoricalData = async (symbol: string, days: number) => {
  const response = await axios.get(
    `${BASE_URL}v2/histoday?fsym=${symbol}&tsym=USD&limit=${days}`,
    {
      headers: {
        authorization: `Apikey ${API_KEY}`,
      },
    },
  );
  return response.data.Data;
};
