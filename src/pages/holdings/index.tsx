import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import { useState } from 'react';

const Holdings = () => {
  const { portfolio } = usePortfolioStore();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredPortfolio = portfolio.holdings
    .filter((h) =>
      h.cryptocurrency.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.value - b.value : b.value - a.value,
    );

  return (
    <>
      <Head>
        <title>Holdings</title>
      </Head>
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
        {filteredPortfolio.map((h) => (
          <li key={h.cryptocurrency.symbol}>
            {h.cryptocurrency.name} ({h.cryptocurrency.symbol}) - {h.quantity}{' '}
            units @ USD{h.averageCost} each
          </li>
        ))}
      </ul>
    </>
  );
};

export default Holdings;
