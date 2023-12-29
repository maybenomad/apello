import { WalletStatus, useWallet } from "@terra-money/wallet-provider";

import { useAddWallet } from "./useAddWallet";

export const useTerra = () => {
  const { addWallet } = useAddWallet();
  const { status, wallets, availableConnectTypes, connect } = useWallet();

  // terra cnx
  const connecterra = async () => {
    connect(availableConnectTypes[0]);
    if (status === WalletStatus.WALLET_CONNECTED) {
      //call the connect hook

      //console.log('before',wallets[0]["terraAddress"])
      addWallet("terra", wallets[0]["terraAddress"]);

      //console.log('after',wallets[0]["terraAddress"])
    }
  };

  //stargaze cnx
  // const connectStargaze = async () => {
  //   if (!window?.keplr) {
  //     alert("Please install keplr extension");
  //   } else {
  //     const chainId = "stargaze-1";

  //     // Enabling before using the Keplr is recommended.
  //     // This method will ask the user whether to allow access if they haven't visited this website.
  //     // Also, it will request that the user unlock the wallet if the wallet is locked.
  //     await window.keplr.enable(chainId);

  //     const offlineSigner = window.keplr.getOfflineSigner(chainId);

  //     // You can get the address/public keys by `getAccounts` method.
  //     // It can return the array of address/public key.
  //     // But, currently, Keplr extension manages only one address/public key pair.
  //     // XXX: This line is needed to set the sender address for SigningCosmosClient.
  //     const accounts = await offlineSigner.getAccounts();
  //     console.log(accounts[0]);

  //     await addWallet("stargaze", accounts[0].address);
  //   }
  // };

  const connectInjNinji = async () => {
    if (!window?.ninji) {
      alert("Please install ninji extension");
    } else {
      const chainId = "injective-1";

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      //wd =await window.keplr.enable(chainId);
      await window.ninji.enable(chainId);

      const offlineSigner = window.ninji.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();


      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.


      await addWallet("injective", accounts[0].address);
    }
  };
  
  const connectJuno = async () => {
    if (!window?.keplr) {
      alert("Please install keplr extension");
    } else {
      const chainId = "juno-1";

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      //wd =await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();

      await addWallet("juno", accounts[0].address);
    }
  };
  const connectTeritori = async () => {
    if (!window?.keplr) {
      alert("Please install keplr extension");
    } else {
      const chainId = "teritori-1";
      await window.keplr.experimentalSuggestChain({
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
      });

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      //wd =await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();

      await addWallet("teritori", accounts[0].address);
    }
  };

  return {
    connecterra,
    connectJuno,
    connectTeritori,
    connectInjNinji
  };
};
