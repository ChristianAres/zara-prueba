import React from "react";
import { CartProvider } from "@/context/CartContext";
import Layout from "@/components/Layout";

export default function ZarApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
