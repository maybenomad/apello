import { useWalletManager } from "@noahsaso/cosmodal";
import { useWallet } from "@terra-money/wallet-provider";

import { useAuthContext } from "./useAuthContext";

export const useDisconnectWallet = () => {
  const { dispatch } = useAuthContext();
  const { disconnect } = useWallet();
  const { disconnect: cosmodalDisconnect } = useWalletManager();

  const disconnectWallet = () => {
    disconnect();
    cosmodalDisconnect();
    // remove wallet from localstorage
    //localStorage.clear();
    localStorage.removeItem("auth");

    //dispatch DISCONNECT_WALLET action
    dispatch({ type: "DISCONNECT_WALLET" });
  };

  return { disconnectWallet };
};
