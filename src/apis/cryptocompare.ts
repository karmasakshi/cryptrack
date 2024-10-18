import axios, { AxiosAdapter } from 'axios';
import { setupCache } from 'axios-cache-adapter';

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

const cache = setupCache({
  maxAge: 15 * 60 * 1000, // Cache for 15 minutes
});

const axiosInstance = axios.create({
  adapter: cache.adapter as AxiosAdapter,
});

export const getCryptocurrencyPrice = async (symbol: string) => {
  const response = await axiosInstance.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`,
    {
      headers: {
        authorization: `Apikey ${API_KEY}`,
      },
    },
  );
  return response.data.USD;
};

export const getCryptocurrencyData = async (symbol: string) => {
  const response = await axiosInstance.get(
    `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}`,
    {
      headers: {
        authorization: `Apikey ${API_KEY}`,
      },
    },
  );
  return response.data.Data;
};

export const getHistoricalData = async (symbol: string, days: number) => {
  const response = await axiosInstance.get(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=${days}`,
    {
      headers: {
        authorization: `Apikey ${API_KEY}`,
      },
    },
  );
  return response.data.Data;
};
