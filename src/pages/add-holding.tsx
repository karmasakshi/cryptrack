import {
  getCryptocurrencyData,
  getCryptocurrencyPrice,
} from '@cryptack/apis/cryptocompare';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import React, { useState } from 'react';

const AddHolding = () => {
  const { addHolding } = usePortfolioStore();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState<string>('0');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddHolding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!symbol || Number(quantity) <= 0) {
      setError('All fields are required and values must be positive.');
      return;
    }

    setLoading(true);

    setError(null);

    try {
      const [currentPrice, data] = await Promise.all([
        getCryptocurrencyPrice(symbol),
        getCryptocurrencyData(symbol),
      ]);

      if (!currentPrice) {
        throw new Error('Unable to fetch the price for this cryptocurrency.');
      }

      const cryptocurrency = {
        name: data.NAME,
        currentPrice,
        logoUrl: data.LOGO_URL,
        symbol,
      };

      addHolding(cryptocurrency, Number(quantity));

      setSymbol('');
      setQuantity('0');
    } catch (err) {
      console.error(err);

      setError('Failed to fetch cryptocurrency price or add holding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Holding</title>
      </Head>
      <h1>Add Cryptocurrency</h1>
      <form onSubmit={handleAddHolding}>
        <div>
          <label htmlFor="symbol">Symbol (e.g., BTC, ETH):</label>
          <input
            type="text"
            placeholder="Symbol (e.g., BTC)"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
            required
            pattern="^(0|[1-9]\d*)(\.\d+)?$"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Holding'}
        </button>
      </form>
    </>
  );
};

export default AddHolding;
