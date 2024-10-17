import { usePortfolioStore } from '@cryptack/store/portfolio';
import Link from 'next/link';

const Navbar = () => {
  const { portfolio } = usePortfolioStore();

  return (
    <nav className="navbar sticky-top bg-body-secondary">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand" href="/">
          Cryptrack
        </Link>
        <div>
          <button type="button" className="btn btn-light me-2" disabled>
            ${portfolio.value.toFixed(2)} ({portfolio.holdings.length})
          </button>
          <Link className="btn btn-primary" href="/add-holding">
            Add Holding
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
