import { usePortfolioStore } from '@cryptack/store/portfolio';
import { useState } from 'react';

const Holdings = () => {
  const { portfolio } = usePortfolioStore();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredPortfolio = portfolio.holdings
    .filter((cryptocurrency) =>
      cryptocurrency.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
    );

  return (
    <div>
      <h1>Holdings</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Price ({sortOrder})
      </button>
      <ul>
        {filteredPortfolio.map((cryptocurrency) => (
          <li key={cryptocurrency.symbol}>
            {cryptocurrency.name} - {cryptocurrency.price} units @ USD{' '}
            {cryptocurrency.price} each
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Holdings;
