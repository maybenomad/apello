import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

import type {
  Collection,
  DataResponse,
  Item,
  ItemWithNextImage,
} from "../components/NFTSelector/types";
import { useAuthContext } from "../hooks/useAuthContext";

export type BannerContextType = {
  config: Config;
  isLoadingCollection: boolean;
  errorFetchingCollections: boolean;
  collections: Collection[];
  saveManualWalletAddress: (address: string) => void;
  saveTwitterUsername: (username: string) => void;
  saveBannerStyle: (style: string) => void;
  saveBannerType: (type: BannerType) => void;
  saveNFTs: (nfts: ItemWithNextImage[]) => void;
};

export interface Config {
  manualWalletAddress: string;
  twitterUsername: string;
  style: BannerStyle;
  selectedNFTs: ItemWithNextImage[];
  type: BannerType;
}

export enum BannerStyle {
  // Banners or Social Media
  Fantasy = "fantasy",
  Gallery = "gallery",
  Street = "street",
  Jungle = "jungle",
  Apeclub = "apeclub",
  Posters = "posters",
  // PFPs
  ProfilePhotoCAA = "pfp-caa",
  // Collabs
  Coinflip = "coinflip",
  Gelotto = "gelotto",
  PixelWizards = "pixel wizards",
}

export enum BannerType {
  TwitterHeader = "twitterHeader",
  General = "general",
  DiscordServer = "discordServer",
  ProfilePhoto = "profilePhoto",
  DEFAULT = "DEFAULT",
}

const INITIAL_CONFIG: Config = {
  manualWalletAddress: "",
  twitterUsername: "",
  style: null,
  selectedNFTs: [],
  type: BannerType.DEFAULT,
};

export const BannerContext = createContext<BannerContextType>({
  config: INITIAL_CONFIG,
  isLoadingCollection: false,
  errorFetchingCollections: false,
  collections: null,
  saveManualWalletAddress: () => {},
  saveTwitterUsername: () => {},
  saveBannerStyle: () => {},
  saveBannerType: () => {},
  saveNFTs: () => {},
});

export const BannerContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { wallet } = useAuthContext();
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [collections, setCollections] = useState<Collection[]>(null);
  const [errorFetchingCollections, setErrorFetchingCollections] =
    useState(false);

  const saveManualWalletAddress = useCallback((address: string) => {
    setConfig((state) => ({ ...state, manualWalletAddress: address }));
  }, []);

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

  const fetchData = useCallback(async (address: string) => {
    setIsLoadingCollection(true);
    setErrorFetchingCollections(false);
    try {
      const response = await axios.get<DataResponse>(
        // `https://nft-api.stargaze-apis.com/api/v1beta/profile/${address}/nfts` // Deprecated API
        `https://nft-api.stargaze-apis.com/api/v1beta/profile/${address}/paginated_nfts?limit=1000`
      );

      const tokens = response.data.tokens;

      const groupedByCollectionName = tokens.reduce((accumulator, item) => {
        const { name } = item.collection;
        const group = accumulator.find((group) => group.name === name);
        const reducedItem = {
          tokenId: item.tokenId,
          image: item.image,
        };

        if (group) {
          group.items.push(reducedItem);
        } else {
          accumulator.push({ name, items: [reducedItem] });
        }

        return accumulator;
      }, [] as Collection[]);

      // Sort collection names A-Z
      groupedByCollectionName.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      // Sort collection items by token id ascending
      groupedByCollectionName.reduce((accumulator, collection) => {
        collection.items.sort((a, b) => {
          return parseInt(a.tokenId) - parseInt(b.tokenId);
        });
        return accumulator;
      }, []);

      setCollections(groupedByCollectionName);
    } catch (error: unknown) {
      setErrorFetchingCollections(true);
    } finally {
      setIsLoadingCollection(false);
    }
  }, []);

  useEffect(() => {
    // Fetch collection data with wallet address or manually entered address
    if (wallet?.type === "stargaze" && wallet?.adress) {
      fetchData(wallet.adress);
    } else if (config.manualWalletAddress?.length > 0) {
      fetchData(config.manualWalletAddress);
    }
  }, [wallet, config.manualWalletAddress]);

  return (
    <BannerContext.Provider
      value={{
        config,
        saveManualWalletAddress,
        saveTwitterUsername,
        saveBannerStyle,
        saveBannerType,
        saveNFTs,
        isLoadingCollection,
        collections,
        errorFetchingCollections,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};
