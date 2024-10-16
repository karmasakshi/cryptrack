import { usePortfolioStore } from '@cryptack/store/portfolio';
import { useState } from 'react';

const Add = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const { addCryptocurrency } = usePortfolioStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol || price <= 0) {
      alert('Please provide valid inputs.');
      return;
    }

    addCryptocurrency({ name, symbol, price: 0 });
    setName('');
    setSymbol('');
    setPrice(0);
  };

  return (
    <div>
      <h1>Add Cryptocurrency</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cryptocurrency Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Symbol (e.g., BTC)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min="0"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
