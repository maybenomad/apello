import {
  ChainInfoID,
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from "@noahsaso/cosmodal";
import { useCallback, useEffect, useState } from "react";

import { useAddWallet } from "./useAddWallet";

export const useCosmodal = () => {
  const [chainId, setChainId] = useState<ChainInfoID>();

  const { connect } = useWalletManager();
  const { status, address } = useWallet(chainId);
  const { addWallet } = useAddWallet();

  const connectToChain = useCallback((value: ChainInfoID) => {
    setChainId(value);
  }, []);

  useEffect(() => {
    if (chainId) {
      connect();
    }
  }, [chainId]);

  useEffect(() => {
    if (address?.length > 0 && status === WalletConnectionStatus.Connected) {
      const chainName = address.startsWith("stars")
        ? "stargaze"
        : address.startsWith("juno")
        ? "juno"
        : address.startsWith("tori")
        ? "teritori"
        : address.startsWith("osmo")
        ? "osmosis"
        : address.startsWith("inj")
        ? "injective"
        : address.startsWith("chihuahua")
        ? "chihuahua"
        : address.startsWith("pasg")
        ? "passage"
        : null;

      if (!chainName) {
        return;
      }

      void addWallet(chainName, address);
    }
  }, [address, status]);

  return { connectToChain };
};
