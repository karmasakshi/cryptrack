import HoldingCard from '@cryptack/components/HoldingCard';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Holdings = () => {
  const { portfolio, removeHolding } = usePortfolioStore();
  const defaultFilters = {
    searchKey: '',
    sortKey: 'name',
    sortOrder: 'asc',
  };

  const [filters, setFilters] = useState(defaultFilters);

  const filteredPortfolio = portfolio.holdings
    .filter((h) =>
      h.cryptocurrency.name
        .toLowerCase()
        .includes(filters.searchKey.toLowerCase()),
    )
    .sort((a, b) => {
      if (filters.sortOrder === 'asc') {
        if (filters.sortKey === 'cryptocurrency.symbol') {
          return a.cryptocurrency.symbol.localeCompare(b.cryptocurrency.symbol);
        }
        // @ts-expect-error @typescript-eslint/no-explicit-any
        return a[filters.sortKey] - b[filters.sortKey];
      } else {
        if (filters.sortKey === 'cryptocurrency.symbol') {
          return b.cryptocurrency.symbol.localeCompare(a.cryptocurrency.symbol);
        }
        // @ts-expect-error @typescript-eslint/no-explicit-any
        return b[filters.sortKey] - a[filters.sortKey];
      }
    });

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
              <div className="d-flex gap-2">
                <input
                  value={filters.searchKey}
                  onChange={(e) =>
                    setFilters({ ...filters, searchKey: e.target.value })
                  }
                  placeholder="Search"
                  type="text"
                  className="form-control"
                  aria-describedby="search"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setFilters(defaultFilters)}
                >
                  Clear
                </button>
              </div>
              <div className="d-flex gap-2 mt-2">
                <select
                  className="form-select"
                  aria-label="Sort by"
                  value={filters.sortKey}
                  onChange={(e) =>
                    setFilters({ ...filters, sortKey: e.target.value })
                  }
                >
                  <option value="value">Value</option>
                  <option value="averageCost">Average Cost</option>
                  <option value="quantity">Quantity</option>
                  <option value="cryptocurrency.currentPrice">
                    Current Price
                  </option>
                  <option value="cryptocurrency.name">Name</option>
                  <option value="cryptocurrency.symbol">Symbol</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
                    })
                  }
                >
                  Sort&nbsp;Order&nbsp;({filters.sortOrder.toUpperCase()})
                </button>
              </div>
            </form>
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
              {filters.searchKey ? (
                <button
                  type="button"
                  className="mt-4 btn btn-secondary"
                  onClick={() => setFilters(defaultFilters)}
                >
                  Clear Filters
                </button>
              ) : (
                <Link href="/add" className="mt-4 btn btn-primary">
                  Add Holding
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Holdings;
