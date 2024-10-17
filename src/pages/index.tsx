import HoldingCard from '@cryptack/components/HoldingCard';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
                />
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

        {filteredPortfolio.length > 0 ? (
          <div className="row g-4 mt-0">
            {filteredPortfolio.map((h) => (
              <div className="col-md-6 col-xl-4" key={h.cryptocurrency.symbol}>
                <HoldingCard removeHolding={handleRemoveHolding} holding={h} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body text-center">
              <Image src="/empty.svg" height={240} width={240} alt="Empty" />
              <h5>No holdings to display.</h5>
              <Link
                href="/add-holding"
                type="button"
                className="btn btn-primary mt-4"
              >
                Add Holding
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Holdings;
