import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { Portfolio } from '@cryptack/interfaces/portfolio';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Holding } from '@cryptack/interfaces/holding';

type PortfolioStoreState = { portfolio: Portfolio };

type PortfolioStoreActions = {
  addHolding: (cryptocurrency: Cryptocurrency, quantity: number) => void;
  removeHolding: (cryptocurrencySymbol: string) => void;
  setPortfolio: (portfolio: Portfolio) => void;
  updateHolding: (
    cryptocurrency: Cryptocurrency,
    quantity: number,
    averageCost: number,
  ) => void;
};

type PortfolioStore = PortfolioStoreState & PortfolioStoreActions;

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolio: {
        value: 0,
        holdings: [],
      },
      setPortfolio: (portfolio) => set(() => ({ portfolio })),
      addHolding: (cryptocurrency, quantity) =>
        set((state) => {
          const existingHolding = state.portfolio.holdings.find(
            (h) => h.cryptocurrency.symbol === cryptocurrency.symbol,
          );
          let newHoldings;
          if (existingHolding) {
            const updatedHolding = {
              cryptocurrency,
              quantity: existingHolding.quantity + quantity,
              value:
                (existingHolding.quantity + quantity) *
                cryptocurrency.currentPrice,
              averageCost:
                (existingHolding.averageCost * existingHolding.quantity +
                  cryptocurrency.currentPrice * quantity) /
                (existingHolding.quantity + quantity),
            };
            newHoldings = state.portfolio.holdings.map((h) =>
              h.cryptocurrency.symbol === cryptocurrency.symbol
                ? updatedHolding
                : h,
            );
          } else {
            const newHolding: Holding = {
              cryptocurrency,
              quantity,
              value: quantity * cryptocurrency.currentPrice,
              averageCost: cryptocurrency.currentPrice * quantity,
            };
            newHoldings = [...state.portfolio.holdings, newHolding];
          }
          const newValue = newHoldings.reduce((total, h) => total + h.value, 0);
          return { portfolio: { holdings: newHoldings, value: newValue } };
        }),

      removeHolding: (cryptocurrencySymbol) =>
        set((state) => {
          const newHoldings = state.portfolio.holdings.filter(
            (h) => h.cryptocurrency.symbol !== cryptocurrencySymbol,
          );
          const newValue = newHoldings.reduce((total, h) => total + h.value, 0);
          return { portfolio: { holdings: newHoldings, value: newValue } };
        }),

      updateHolding: (cryptocurrency, quantity, averageCost) =>
        set((state) => {
          const newHoldings = state.portfolio.holdings.map((h) =>
            h.cryptocurrency.symbol === cryptocurrency.symbol
              ? {
                  cryptocurrency,
                  quantity,
                  value: quantity * cryptocurrency.currentPrice,
                  averageCost,
                }
              : h,
          );
          const newValue = newHoldings.reduce((total, h) => total + h.value, 0);
          return { portfolio: { holdings: newHoldings, value: newValue } };
        }),
    }),
    {
      name: 'cryptrack-portfolio',
    },
  ),
);
