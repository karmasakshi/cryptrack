import { getHistoricalData } from '@cryptack/apis/cryptocompare';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Holding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio } = usePortfolioStore();
  const [historicalData, setHistoricalData] = useState([]);

  const cryptocurrency: Cryptocurrency = portfolio.holdings.find(
    (h) => h.cryptocurrency.symbol === symbol,
  ).cryptocurrency;

  useEffect(() => {
    if (cryptocurrency) {
      getHistoricalData(cryptocurrency.symbol, 30).then(setHistoricalData);
    }
  }, [cryptocurrency]);

  if (!cryptocurrency) {
    return <div>Cryptocurrency not found.</div>;
  } else {
    return (
      <div>
        <h1>{cryptocurrency.name} Details</h1>
        <p>Current Price: {cryptocurrency.currentPrice}</p>
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
