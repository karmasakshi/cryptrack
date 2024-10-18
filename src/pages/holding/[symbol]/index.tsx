import {
  getCryptocurrencyData,
  getHistoricalData,
} from '@cryptack/apis/cryptocompare';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { CryptocurrencyData } from '@cryptack/interfaces/cryptocurrency-data';
import { HistoricalData } from '@cryptack/interfaces/historical-data';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import { formatAmount } from '@cryptack/utils/format-amount';
import 'chart.js/auto';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Holding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio } = usePortfolioStore();
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [cryptocurrencyData, setCryptocurrencyData] =
    useState<CryptocurrencyData | null>(null);
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
      getCryptocurrencyData(cryptocurrency.symbol).then((response) => {
        setCryptocurrencyData(response);
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
          <title>
            {cryptocurrency.name} ({cryptocurrency.symbol.toUpperCase()})
          </title>
        </Head>
        <div className="container-fluid">
          <h3 className="mt-4">
            {cryptocurrency.name} ({cryptocurrency.symbol.toUpperCase()}) ($
            {formatAmount(cryptocurrency.currentPrice)})
          </h3>
          <div className="row row-gap-4 mt-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  {loading ? (
                    <div className="placeholder-glow">
                      <span
                        className="placeholder col-12"
                        style={{ height: '120px', display: 'block' }}
                      ></span>
                      <p className="lead mt-4 placeholder col-12"></p>
                      <small className="text-muted mt-4 placeholder col-12"></small>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={cryptocurrency.logoUrl}
                        alt={cryptocurrency.name}
                        width={120}
                        height={120}
                      />
                      <p className="lead mt-4">
                        {cryptocurrencyData?.ASSET_DESCRIPTION_SNIPPET}
                      </p>
                      <small className="text-muted mt-4">
                        {cryptocurrencyData?.ASSET_DESCRIPTION_SUMMARY}
                      </small>
                    </>
                  )}
                </div>
              </div>
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title">Official Channels</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                    {loading ? (
                      <div className="placeholder-glow col-12">
                        <span
                          className="placeholder col-12"
                          style={{ height: '40px', display: 'block' }}
                        ></span>
                      </div>
                    ) : (
                      <>
                        {cryptocurrencyData?.SUBREDDITS?.[0]?.URL && (
                          <a
                            target="_blank"
                            href={cryptocurrencyData.SUBREDDITS[0].URL}
                            className="btn btn-light"
                          >
                            Reddit
                          </a>
                        )}
                        {cryptocurrencyData?.TWITTER_ACCOUNTS?.[0]?.URL && (
                          <a
                            target="_blank"
                            href={cryptocurrencyData.TWITTER_ACCOUNTS[0].URL}
                            className="btn btn-light"
                          >
                            X/Twitter
                          </a>
                        )}
                        {cryptocurrencyData?.DISCORD_SERVERS?.[0]?.URL && (
                          <a
                            target="_blank"
                            href={cryptocurrencyData.DISCORD_SERVERS[0].URL}
                            className="btn btn-light"
                          >
                            Discord
                          </a>
                        )}
                        {cryptocurrencyData?.TELEGRAM_GROUPS?.[0]?.URL && (
                          <a
                            target="_blank"
                            href={cryptocurrencyData.TELEGRAM_GROUPS[0].URL}
                            className="btn btn-light"
                          >
                            Telegram
                          </a>
                        )}
                        <a
                          target="_blank"
                          href={cryptocurrencyData?.WEBSITE_URL}
                          className="btn btn-light"
                        >
                          Official Website
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
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
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title">Project Leaders</h5>
                  <div className="d-flex overflow-auto">
                    <div
                      className="d-flex mt-4 p-2"
                      style={{ minWidth: 'max-content' }}
                    >
                      {loading ? (
                        <div className="placeholder-glow col-12">
                          <span
                            className="placeholder col-12"
                            style={{ height: '120px', display: 'block' }}
                          ></span>
                        </div>
                      ) : cryptocurrencyData?.PROJECT_LEADERS?.length ? (
                        cryptocurrencyData.PROJECT_LEADERS.map(
                          (
                            leader: { FULL_NAME: string; LEADER_TYPE: string },
                            index: number,
                          ) => (
                            <div
                              key={index}
                              className="card border-0 shadow-sm me-4"
                              style={{ width: '120px' }}
                            >
                              <div className="card-body text-center">
                                <Image
                                  src={`https://avatar.iran.liara.run/public?username=${leader.FULL_NAME}`}
                                  height={90}
                                  width={90}
                                  alt={leader.FULL_NAME}
                                />
                                <small className="d-block text-muted mt-2">
                                  {leader.FULL_NAME} ({leader.LEADER_TYPE})
                                </small>
                              </div>
                            </div>
                          ),
                        )
                      ) : (
                        <p>No information.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Holding;
