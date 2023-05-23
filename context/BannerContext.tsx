import React, { createContext, useCallback, useState } from "react";
import { Item } from "../components/NFTSelector/types";

export type BannerContextType = {
  config: Config;
  saveTwitterUsername: (username: string) => void;
  saveBannerStyle: (style: string) => void;
  saveBannerType: (type: BannerType) => void;
  saveNFTs: (nfts: Item[]) => void;
};

export interface Config {
  twitterUsername: string;
  style: BannerStyle;
  selectedNFTs: Item[];
  type: BannerType;
}

export enum BannerStyle {
  // Implemented as Twitter banner only so far
  Fantasy = "fantasy",
  Gallery = "gallery",
  Street = "street",
  // To be implemented
  Cyberpunk = "cyberpunk",
  Posters = "posters",
  Synthwave = "synthwave",
  Tron = "Tron",
  Warpspeed = "warpspeed",
}

export enum BannerType {
  TwitterHeader = "twitterHeader",
  SocialRect = "socialRect",
  DEFAULT = "DEFAULT",
}

const INITIAL_CONFIG: Config = {
  twitterUsername: "",
  style: null,
  selectedNFTs: [],
  type: BannerType.DEFAULT,
};

export const BannerContext = createContext<BannerContextType>({
  config: INITIAL_CONFIG,
  saveTwitterUsername: () => {},
  saveBannerStyle: () => {},
  saveBannerType: () => {},
  saveNFTs: () => {},
});

export const BannerContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);

  const saveNFTs = useCallback((nfts: Item[]) => {
    setConfig((state) => ({ ...state, selectedNFTs: nfts }));
  }, []);

  const saveTwitterUsername = useCallback((username: string) => {
    setConfig((state) => ({ ...state, twitterUsername: username }));
  }, []);

  const saveBannerStyle = useCallback((style: BannerStyle) => {
    setConfig((state) => ({ ...state, style }));
  }, []);

  const saveBannerType = useCallback((type: BannerType) => {
    setConfig((state) => ({ ...state, type }));
  }, []);

  return (
    <BannerContext.Provider
      value={{
        config,
        saveTwitterUsername,
        saveBannerStyle,
        saveBannerType,
        saveNFTs,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};
