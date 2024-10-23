import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { Holding } from '@cryptack/interfaces/holding';
import { Portfolio } from '@cryptack/interfaces/portfolio';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PortfolioStoreState = { portfolio: Portfolio };

type PortfolioStoreActions = {
  addHolding: (cryptocurrency: Cryptocurrency, quantity: number) => void;
  removeHolding: (cryptocurrencySymbol: string) => void;
  updateHolding: (updatedHolding: Holding) => void;
};

type PortfolioStore = PortfolioStoreState & PortfolioStoreActions;

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolio: {
        value: 0,
        holdings: [],
      },
      addHolding: (cryptocurrency, quantity) =>
        set((state) => {
          const existingHolding = state.portfolio.holdings.find(
            (h) => h.cryptocurrency.symbol === cryptocurrency.symbol,
          );
          let newHoldings;
          if (existingHolding) {
            const updatedHolding = {
              ...existingHolding,
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
              averageCost: cryptocurrency.currentPrice,
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

      updateHolding: (updatedHolding) =>
        set((state) => {
          const newHoldings = state.portfolio.holdings.map((h) => {
            if (
              h.cryptocurrency.symbol === updatedHolding.cryptocurrency.symbol
            ) {
              const updatedQuantity = updatedHolding.quantity;
              const updatedValue =
                updatedQuantity * h.cryptocurrency.currentPrice;
              return { ...h, ...updatedHolding, value: updatedValue };
            }
            return h;
          });
          const newValue = newHoldings.reduce((total, h) => total + h.value, 0);
          return { portfolio: { holdings: newHoldings, value: newValue } };
        }),
    }),
    {
      name: 'cryptrack-portfolio',
    },
  ),
);
