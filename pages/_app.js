import { Analytics } from "@vercel/analytics/react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as ninjiWallets } from "@cosmos-kit/ninji";
import { chains, assets } from "chain-registry";

import Layout from "../containers/Layout";
import { AuthContextProvider } from "../components/AuthProvider";
import "../styles/globals.css";
import "../styles/starfield.sass";
import "@interchain-ui/react/styles";

const WC_PROJECT_ID = "a4a7d739f0795a89b2b212a734d662fa";

export default function App({ Component, pageProps }) {
  const supportedWallets = [...keplrWallets, ...leapWallets, ...ninjiWallets];
  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={supportedWallets}
      walletConnectOptions={{ signClient: { projectId: WC_PROJECT_ID } }}
    >
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AuthContextProvider>
    </ChainProvider>
  );
}
