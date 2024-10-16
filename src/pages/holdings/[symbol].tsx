import { usePortfolioStore } from '@cryptack/store/portfolio';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Holding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio } = usePortfolioStore();
  const [historicalData, setHistoricalData] = useState([]);

  const cryptocurrency = portfolio.holdings.find((c) => c.symbol === symbol);

  useEffect(() => {
    if (cryptocurrency) {
      setHistoricalData([]);
    }
  }, [cryptocurrency]);

  if (!cryptocurrency) {
    return <div>Cryptocurrency not found.</div>;
  } else {
    return (
      <div>
        <h1>{cryptocurrency.name} Details</h1>
        <p>Price: {cryptocurrency.price}</p>
        <h2>Historical Prices</h2>
        <ul>
          {historicalData.map((data, index) => (
            <li key={index}>
              Date: {new Date(data.time * 1000).toLocaleDateString()}, Price: $
              {data.close}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Holding;
