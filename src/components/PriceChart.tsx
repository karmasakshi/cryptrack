import { getHistoricalData } from '@cryptack/apis/cryptocompare';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { HistoricalData } from '@cryptack/interfaces/historical-data';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const PriceChart = ({ cryptocurrency }: { cryptocurrency: Cryptocurrency }) => {
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [timeframe, setTimeframe] = useState<number>(30);

  useEffect(() => {
    setLoading(true);
    getHistoricalData(cryptocurrency.symbol, timeframe)
      .then((response) => {
        setHistoricalData(response.Data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeframe, cryptocurrency.symbol]);

  const chartData = {
    labels: historicalData?.map((data) =>
      new Date(data.time * 1000).toLocaleDateString(),
    ),
    datasets: [
      {
        label: 'Close Price',
        data: historicalData?.map((data) => data.close),
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
      {
        label: 'High Price',
        data: historicalData?.map((data) => data.high),
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        fill: false,
      },
      {
        label: 'Low Price',
        data: historicalData?.map((data) => data.low),
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        fill: false,
      },
      {
        label: 'Open Price',
        data: historicalData?.map((data) => data.open),
        borderColor: 'rgba(108, 117, 125, 1)',
        backgroundColor: 'rgba(108, 117, 125, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <>
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
          <div className="placeholder-glow">
            <span
              className="placeholder col-12"
              style={{ height: '300px', display: 'block' }}
            ></span>
          </div>
        ) : (
          <Line data={chartData} />
        )}
      </div>
    </>
  );
};

export default PriceChart;
