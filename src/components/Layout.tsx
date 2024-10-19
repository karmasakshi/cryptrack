import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="container-fluid">{children}</main>
      <footer className="mt-4"></footer>
    </>
  );
};

export default Layout;
