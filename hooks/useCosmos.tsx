import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from "@noahsaso/cosmodal";
import { useCallback, useEffect } from "react";

import { useAddWallet } from "./useAddWallet";

export const useCosmos = () => {
  const { connect: cosmosConnect, disconnect: cosmosDisconnect } =
    useWalletManager();
  const { status, address } = useWallet();
  const { addWallet } = useAddWallet();

  const connectStargaze = useCallback(() => {
    if (!window["keplr"]) {
      alert("Please install keplr extension");
    } else if (status === WalletConnectionStatus.ReadyForConnection) {
      cosmosConnect();
    }
  }, [cosmosConnect, status]);

  useEffect(() => {
    if (status === WalletConnectionStatus.Connected && address) {
      void addWallet("stargaze", address);
    }
  }, [address, status]);

  return {
    connectStargaze,
    cosmosDisconnect,
  };
};
