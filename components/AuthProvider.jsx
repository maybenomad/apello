import { createContext, useContext, useState } from "react";
import { useManager } from "@cosmos-kit/react";

import * as ApelloAPI from "../interface/apello";
import waitFor from "../lib/waitFor";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const walletManager = useManager();
  const [auth, setAuth] = useState(null);

  function connectWallet(chainName) {
    const walletRepo = walletManager.getWalletRepo(chainName);
    walletRepo.activate();
    walletRepo.connect();

    return waitFor(() =>
      walletRepo.current.isWalletConnected ? walletRepo.current : null
    );
  }

  function disconnectWallet(chainName) {
    const walletRepo = walletManager.getWalletRepo(chainName);
    walletRepo.current.disconnect();

    return waitFor(() => !walletRepo.current.isWalletConnected);
  }

  async function connect(chainName) {
    const wallet = await connectWallet(chainName);
    const response = await ApelloAPI.addWallet(
      wallet.chainName,
      wallet.address
    );
    setAuth(response.data);
  }

  async function disconnect() {
    if (!auth) return;

    await disconnectWallet(auth.wallet.type);
    setAuth(null);
  }

  const contextValue = {
    connect,
    disconnect,

    ...(auth || {}),
    wallet: auth ? { ...auth.wallet, address: auth.wallet.adress } : undefined,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
