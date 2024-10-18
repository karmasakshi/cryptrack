import { getHistoricalData } from '@cryptack/apis/cryptocompare';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { HistoricalData } from '@cryptack/interfaces/historical-data';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import { formatAmount } from '@cryptack/utils/format-amount';
import 'chart.js/auto';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Holding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio } = usePortfolioStore();
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [timeframe, setTimeframe] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);

  const cryptocurrency: Cryptocurrency | undefined = portfolio.holdings.find(
    (h) => h.cryptocurrency.symbol === symbol,
  )?.cryptocurrency;

  useEffect(() => {
    if (cryptocurrency) {
      setLoading(true);
      getHistoricalData(cryptocurrency.symbol, timeframe).then((response) => {
        setHistoricalData(response.Data);
        setLoading(false);
      });
    }
  }, [cryptocurrency, timeframe]);

  if (!cryptocurrency) {
    return <div>Cryptocurrency not found.</div>;
  } else {
    const chartData = {
      labels: historicalData.map((data) =>
        new Date(data.time * 1000).toLocaleDateString(),
      ),
      datasets: [
        {
          label: 'Close Price',
          data: historicalData.map((data) => data.close),
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
        },
        {
          label: 'High Price',
          data: historicalData.map((data) => data.high),
          borderColor: 'rgba(40, 167, 69, 1)',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          fill: false,
        },
        {
          label: 'Low Price',
          data: historicalData.map((data) => data.low),
          borderColor: 'rgba(255, 193, 7, 1)',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          fill: false,
        },
        {
          label: 'Open Price',
          data: historicalData.map((data) => data.open),
          borderColor: 'rgba(108, 117, 125, 1)',
          backgroundColor: 'rgba(108, 117, 125, 0.2)',
          fill: false,
        },
      ],
    };

    return (
      <>
        <Head>
          <title>{cryptocurrency.symbol.toUpperCase()} Details</title>
        </Head>
        <div className="container-fluid">
          <h3 className="mt-4">
            {cryptocurrency.symbol.toUpperCase()} Details ($
            {formatAmount(cryptocurrency.currentPrice)})
          </h3>
          <div className="card mt-4 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Historical Prices</h5>
              <div className="mt-2 d-flex justify-content-end">
                <div className="btn-group" role="group">
                  <button
                    onClick={() => setTimeframe(1)}
                    className={`btn btn-secondary ${timeframe === 1 ? 'active' : ''}`}
                  >
                    24h
                  </button>
                  <button
                    onClick={() => setTimeframe(7)}
                    className={`btn btn-secondary ${timeframe === 7 ? 'active' : ''}`}
                  >
                    7d
                  </button>
                  <button
                    onClick={() => setTimeframe(30)}
                    className={`btn btn-secondary ${timeframe === 30 ? 'active' : ''}`}
                  >
                    30d
                  </button>
                </div>
              </div>
              <div className="mt-4">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center pb-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Line data={chartData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Holding;
