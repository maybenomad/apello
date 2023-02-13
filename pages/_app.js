import Layout from '../containers/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import {
  getChainOptions,
  StaticWalletProvider,
  WalletControllerChainOptions,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css'
// import localFont from '@next/font';

// const myFont = localFont({
//   src: '/fonts/Azonix.otf',
//   variable: '--font-azonix'
// })

 export default function App({ Component,pageProps, defaultNetwork, walletConnectChainIds }= AppProps && WalletControllerChainOptions ) {
  
  const main = (
        <AuthContextProvider >
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
        </AuthContextProvider>
  )
  
    
  return typeof window !== 'undefined' ? (
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