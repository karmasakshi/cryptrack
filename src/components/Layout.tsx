import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar></Navbar>
      <main className="container-fluid">{children}</main>
    </>
  );
};

export default Layout;
