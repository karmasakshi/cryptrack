import { getCryptocurrencyData } from '@cryptack/apis/cryptocompare';
import PriceChart from '@cryptack/components/PriceChart';
import { Cryptocurrency } from '@cryptack/interfaces/cryptocurrency';
import { CryptocurrencyData } from '@cryptack/interfaces/cryptocurrency-data';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import { formatAmount } from '@cryptack/utils/format-amount';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Holding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio } = usePortfolioStore();
  const [cryptocurrencyData, setCryptocurrencyData] = useState<
    CryptocurrencyData | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const cryptocurrency: Cryptocurrency | undefined = portfolio.holdings.find(
    (h) => h.cryptocurrency.symbol === symbol,
  )?.cryptocurrency;

  useEffect(() => {
    if (cryptocurrency) {
      setLoading(true);
      getCryptocurrencyData(cryptocurrency.symbol).then((response) => {
        setCryptocurrencyData(response);
        setLoading(false);
      });
    }
  }, [cryptocurrency]);

  if (!cryptocurrency) {
    return <div>Cryptocurrency not found.</div>;
  } else {
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
                        style={{ height: '600px', display: 'block' }}
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
                          style={{ height: '90px', display: 'block' }}
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
                  <PriceChart cryptocurrency={cryptocurrency} />
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
