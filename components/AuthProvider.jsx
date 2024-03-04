import { createContext, useEffect, useState } from "react";
import { useManager } from "@cosmos-kit/react";

import * as ApelloAPI from "../interface/apello";
import waitFor from "../lib/waitFor";

const AUTH_CACHE_KEY = "apello/wallet";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const walletManager = useManager();
  const [auth, setAuth] = useState(null);

  function connectWallet(chainName) {
    const walletRepo = walletManager.getWalletRepo(chainName);
    walletRepo.activate();
    walletRepo.connect();

    return waitFor(() =>
      walletRepo.current?.isWalletConnected ? walletRepo.current : null,
    );
  }

  function disconnectWallet(chainName) {
    const walletRepo = walletManager.getWalletRepo(chainName);
    if (!walletRepo.current) return;

    walletRepo.current.disconnect();

    return waitFor(() => !walletRepo.current?.isWalletConnected);
  }

  function view() {
    if (!auth) return;

    const walletRepo = walletManager.getWalletRepo(auth.wallet.type);
    walletRepo.openView();
  }

  async function connect(chainName) {
    const wallet = await connectWallet(chainName);
    const response = await ApelloAPI.addWallet(
      wallet.chainName,
      wallet.address,
    );

    setAuth(response.data);

    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(response.data));
  }

  async function disconnect() {
    if (!auth) return;

    await disconnectWallet(auth.wallet.type);

    setAuth(null);

    localStorage.clear();
  }

  async function reconnect(cachedAuth) {
    try {
      await ApelloAPI.checkWallet(cachedAuth.token, cachedAuth.wallet.adress);
    } catch (e) {
      return localStorage.clear();
    }

    const walletRepo = walletManager.getWalletRepo(cachedAuth.wallet.type);
    walletRepo.activate();

    setAuth(cachedAuth);
  }

  useEffect(() => {
    const cachedAuth = JSON.parse(localStorage.getItem(AUTH_CACHE_KEY));
    if (cachedAuth) {
      reconnect(cachedAuth);
    }
  }, []);

  const contextValue = {
    connect,
    disconnect,
    view,

    ...(auth || {}),
    wallet: auth ? { ...auth.wallet, address: auth.wallet.adress } : undefined,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
