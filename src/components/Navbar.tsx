import { usePortfolioStore } from '@cryptack/store/portfolio';
import { formatAmount } from '@cryptack/utils/format-amount';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const { portfolio } = usePortfolioStore();

  return (
    <nav className="navbar sticky-top bg-body-secondary">
      <div className="container-fluid justify-content-between">
        <div className="d-flex">
          <Link className="navbar-brand" href="/">
            Cryptrack
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${activePath === '/' ? 'active' : ''}`}
                href="/"
              >
                Holdings
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-light" disabled>
            <pre className="d-inline">
              ${formatAmount(portfolio.value)} ({portfolio.holdings.length})
            </pre>
          </button>
          <Link className="btn btn-primary" href="/add">
            Add Holding
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
