import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Portfolio } from '@cryptack/interfaces/portfolio';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';

type PortfolioStoreState = { portfolio: Portfolio };

type PortfolioStoreActions = {
  addCryptocurrency: (cryptocurrency: Cryptocurrency) => void;
  removeCryptocurrency: (
    cryptocurrencySymbol: Cryptocurrency['symbol'],
  ) => void;
  updateCryptocurrency: (cryptocurrency: Cryptocurrency) => void;
};

type PortfolioStore = PortfolioStoreState & PortfolioStoreActions;

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolio: {
        value: 0,
        holdings: [],
      },
      addCryptocurrency: (cryptocurrency) =>
        set((state) => {
          const holdings = [...state.portfolio.holdings, cryptocurrency];
          const value = holdings.reduce(
            (value, cryptocurrency) => value + cryptocurrency.price,
            0,
          );
          return { portfolio: { holdings, value } };
        }),
      removeCryptocurrency: (cryptocurrencySymbol) =>
        set((state) => {
          const holdings = state.portfolio.holdings.filter(
            (c) => c.symbol !== cryptocurrencySymbol,
          );
          const value = holdings.reduce(
            (value, cryptocurrency) => value + cryptocurrency.price,
            0,
          );
          return { portfolio: { holdings, value } };
        }),
      updateCryptocurrency: (cryptocurrency) =>
        set((state) => {
          const holdings = state.portfolio.holdings.map((c) =>
            c.symbol === cryptocurrency.symbol ? cryptocurrency : c,
          );
          const value = holdings.reduce(
            (value, cryptocurrency) => value + cryptocurrency.price,
            0,
          );
          return { portfolio: { holdings, value } };
        }),
    }),
    {
      name: 'cryptrack-portfolio',
    },
  ),
);
