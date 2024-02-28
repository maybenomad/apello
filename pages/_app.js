import {
  ChainInfoID,
  WalletManagerProvider,
  WalletType,
} from "@noahsaso/cosmodal";
import {
  StaticWalletProvider,
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";

import Layout from "../containers/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/starfield.sass";

export default function App(
  { Component, pageProps, defaultNetwork, walletConnectChainIds } = AppProps &&
    WalletControllerChainOptions
) {
  const main = (
    <WalletManagerProvider
      defaultChainId={ChainInfoID.Stargaze1}
      enabledWalletTypes={[
        WalletType.Leap,
        WalletType.Keplr,
        WalletType.KeplrMobile,
      ]}
      walletConnectClientMeta={{
        name: "Apello.xyz",
        description: "A platform for Cosmos tooling",
        url: "https://apello.xyz/",
        icons: ["https://apello.xyz/lyre-08.png"],
      }}
      chainInfoOverrides={[
        {
          chainId: "teritori-1",
          chainName: "Teritori",
          rpc: "https://rpc.mainnet.teritori.com",
          rest: "https://rest.mainnet.teritori.com",
          stakeCurrency: {
            coinDenom: "TORI",
            coinMinimalDenom: "utori",
            coinDecimals: 6,
            coinGeckoId: "teritori",
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "tori",
            bech32PrefixAccPub: "toripub",
            bech32PrefixValAddr: "torivaloper",
            bech32PrefixValPub: "torivaloperpub",
            bech32PrefixConsAddr: "torivalcons",
            bech32PrefixConsPub: "torivalconspub",
          },
          currencies: [
            {
              coinDenom: "TORI",
              coinMinimalDenom: "utori",
              coinDecimals: 6,
              coinGeckoId: "teritori",
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "TORI",
              coinMinimalDenom: "utori",
              coinDecimals: 6,
              coinGeckoId: "teritori",
              gasPriceStep: {
                low: 0,
                average: 0.025,
                high: 0.04,
              },
            },
          ],
          features: [
            "stargate",
            "ibc-transfer",
            "cosmwasm",
            "no-legacy-stdTx",
            "ibc-go",
          ],
          beta: true,
        },
        {
          chainId: "injective-1",
          chainName: "Injective",
          rpc: "https://injective-rpc.polkachu.com",
          rest: "https://injective-api.polkachu.com",
          stakeCurrency: {
            coinDenom: "INJ",
            coinMinimalDenom: "uinj",
            coinDecimals: 6,
            coinGeckoId: "injective",
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "inj",
            bech32PrefixAccPub: "injpub",
            bech32PrefixValAddr: "injvaloper",
            bech32PrefixValPub: "injvaloperpub",
            bech32PrefixConsAddr: "injvalcons",
            bech32PrefixConsPub: "injvalconspub",
          },
          currencies: [
            {
              coinDenom: "INJ",
              coinMinimalDenom: "uinj",
              coinDecimals: 6,
              coinGeckoId: "injective",
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "INJ",
              coinMinimalDenom: "uinj",
              coinDecimals: 6,
              coinGeckoId: "injective",
              gasPriceStep: {
                low: 0,
                average: 0.025,
                high: 0.04,
              },
            },
          ],
          features: [
            "stargate",
            "ibc-transfer",
            "cosmwasm",
            "no-legacy-stdTx",
            "ibc-go",
          ],
          beta: true,
        },
        {
          chainId: "passage-2",
          chainName: "Passage",
          rpc: "https://passage-rpc.polkachu.com",
          rest: "https://passage-api.polkachu.com",
          stakeCurrency: {
            coinDenom: "pasg",
            coinMinimalDenom: "upasg",
            coinDecimals: 6,
            coinGeckoId: "passage",
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "pasg",
            bech32PrefixAccPub: "pasgpub",
            bech32PrefixValAddr: "pasgvaloper",
            bech32PrefixValPub: "pasgvaloperpub",
            bech32PrefixConsAddr: "pasgvalcons",
            bech32PrefixConsPub: "pasgvalconspub",
          },
          currencies: [
            {
              coinDenom: "PASG",
              coinMinimalDenom: "upasg",
              coinDecimals: 6,
              coinGeckoId: "passage",
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "pasg",
              coinMinimalDenom: "upasg",
              coinDecimals: 6,
              coinGeckoId: "passage",
              gasPriceStep: {
                low: 0,
                average: 0.025,
                high: 0.04,
              },
            },
          ],
          features: [
            "stargate",
            "ibc-transfer",
            "cosmwasm",
            "no-legacy-stdTx",
            "ibc-go",
          ],
          beta: true,
        },
      ]}
    >
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AuthContextProvider>
    </WalletManagerProvider>
  );

  return typeof window !== "undefined" ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}
App.getInitialProps = async () => {
  const chainOptions = await getChainOptions();
  return {
    ...chainOptions,
  };
};

/**
 * mport { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import '../styles/globals.css'
<ChainProvider  chains={chains}
          assetLists={assets} wallets={[...keplrWallets]}
          >
          <AuthContextProvider >
              <Layout>
                <Component  />
              </Layout>
          </AuthContextProvider>
        </ChainProvider>
 */
