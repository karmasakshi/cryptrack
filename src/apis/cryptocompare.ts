import axios, { AxiosAdapter } from 'axios';
import { setupCache } from 'axios-cache-adapter';

const API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

const cache = setupCache({
  maxAge: 15 * 60 * 1000, // Cache for 15 minutes
});

const axiosInstance = axios.create({
  adapter: cache.adapter as AxiosAdapter,
});

const getHeaders = () => ({
  headers: {
    authorization: `Apikey ${API_KEY}`,
  },
});

export const getCryptocurrencyPrice = async (symbol: string) => {
  try {
    const response = await axiosInstance.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`,
      getHeaders(),
    );
    return response.data.USD;
  } catch (error) {
    console.error(`Failed to fetch cryptocurrency price for ${symbol}:`, error);
    throw error;
  }
};

export const getCryptocurrencyData = async (symbol: string) => {
  try {
    const response = await axiosInstance.get(
      `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}`,
      getHeaders(),
    );
    return response.data.Data;
  } catch (error) {
    console.error(`Failed to fetch cryptocurrency data for ${symbol}:`, error);
    throw error;
  }
};

export const getHistoricalData = async (symbol: string, days: number) => {
  try {
    const response = await axiosInstance.get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=${days}`,
      getHeaders(),
    );
    return response.data.Data;
  } catch (error) {
    console.error(`Failed to fetch historical data for ${symbol}:`, error);
    throw error;
  }
};
