import { Analytics } from "@vercel/analytics/react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { chains, assets } from "chain-registry";

import Layout from "../containers/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/starfield.sass";
import "@interchain-ui/react/styles";

export default function App({ Component, pageProps }) {
  return (
    <ChainProvider chains={chains} assetLists={assets} wallets={wallets}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AuthContextProvider>
    </ChainProvider>
  );
}
