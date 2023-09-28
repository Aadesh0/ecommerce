import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar, Footer } from ".";

interface LayoutProps {
  children: ReactNode; // Use ReactNode as the type for children
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>Accessories Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
