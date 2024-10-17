import { getCryptocurrencyPrice } from '@cryptack/apis/cryptocompare';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import React, { useState } from 'react';

const Add = () => {
  const { addHolding } = usePortfolioStore();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddHolding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !symbol || quantity <= 0) {
      setError('All fields are required and values must be positive.');
      return;
    }

    setLoading(true);

    setError(null);

    try {
      const currentPrice = await getCryptocurrencyPrice(symbol);

      if (!currentPrice) {
        throw new Error('Unable to fetch the price for this cryptocurrency.');
      }

      const cryptocurrency = {
        name,
        currentPrice,
        symbol,
      };

      addHolding(cryptocurrency, quantity);

      setName('');
      setSymbol('');
      setQuantity(0);
    } catch (err) {
      console.error(err);

      setError('Failed to fetch cryptocurrency price or add holding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Cryptocurrency</h1>
      <form onSubmit={handleAddHolding}>
        <div>
          <label htmlFor="name">Cryptocurrency Name:</label>
          <input
            type="text"
            placeholder="Cryptocurrency Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            id="quantity"
            required
            min="0"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Holding'}
        </button>
      </form>
    </div>
  );
};

export default Add;
