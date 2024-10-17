import { usePortfolioStore } from '@cryptack/store/portfolio';

const Dashboard = () => {
  const { portfolio } = usePortfolioStore();

  return (
    <div>
      <h1>Portfolio Summary</h1>
      <p>Value: USD{portfolio.value.toFixed(2)}</p>
      <p>Holdings: {portfolio.holdings.length}</p>
    </div>
  );
};

export default Dashboard;
