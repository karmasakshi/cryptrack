import Layout from '@cryptack/components/Layout';
import { portfolio } from '@cryptack/seed/portfolio';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const { setPortfolio } = usePortfolioStore();

  useEffect(() => {
    setPortfolio(portfolio);
  }, [setPortfolio]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
