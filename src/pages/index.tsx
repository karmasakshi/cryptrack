import HoldingCard from '@cryptack/components/HoldingCard';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import { useState } from 'react';

const Holdings = () => {
  const { portfolio, removeHolding } = usePortfolioStore();
  const [searchKey, setSearchKey] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredPortfolio = portfolio.holdings
    .filter((h) =>
      h.cryptocurrency.name.toLowerCase().includes(searchKey.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.value - b.value : b.value - a.value,
    );

  const handleRemoveHolding = (symbol: string) => {
    removeHolding(symbol);
  };

  return (
    <>
      <Head>
        <title>Holdings</title>
      </Head>
      <div className="container-fluid">
        <h3 className="my-4">Holdings ({portfolio.holdings.length})</h3>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <input
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search"
                  type="text"
                  className="form-control"
                  aria-describedby="search"
                ></input>
              </div>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Sort by Price ({sortOrder})
            </button>
          </div>
        </div>

        <div className="row g-4 mt-2">
          {filteredPortfolio.map((h) => (
            <div className="col-md-6 col-xl-4" key={h.cryptocurrency.symbol}>
              <HoldingCard removeHolding={handleRemoveHolding} holding={h} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Holdings;
