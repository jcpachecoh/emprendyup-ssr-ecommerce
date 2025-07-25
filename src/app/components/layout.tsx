import { ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';
import ScrollToTop from './scroll-to-top';
import Switcher from './switcher';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={false} />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
      <ScrollToTop />
      <Switcher />
    </>
  );
};

export default Layout;
