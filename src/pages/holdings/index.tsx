import HoldingCard from '@cryptack/components/HoldingCard';
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
      <div className="container-fluid my-4">
        <div className="row g-4">
          {filteredPortfolio.map((h) => (
            <div
              className="col-12 col-lg-6 col-xl-4 d-flex align-items-stretch"
              key={h.cryptocurrency.symbol}
            >
              <HoldingCard holding={h} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Holdings;
