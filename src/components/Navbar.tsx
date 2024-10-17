import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <nav className="navbar navbar-expand-md bg-body-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Cryptrack
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${activePath === '/' ? 'active' : ''}`}
                href="/"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activePath === '/holdings' ? 'active' : ''}`}
                href="/holdings"
              >
                Holdings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activePath === '/add-holding' ? 'active' : ''}`}
                href="/add-holding"
              >
                Add Holding
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
