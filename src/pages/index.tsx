import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';

const Dashboard = () => {
  const { portfolio } = usePortfolioStore();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Portfolio Summary</h1>
      <p>Value: USD{portfolio.value.toFixed(2)}</p>
      <p>Holdings: {portfolio.holdings.length}</p>
    </>
  );
};

export default Dashboard;
