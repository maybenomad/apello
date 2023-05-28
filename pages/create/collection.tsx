import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import NFTSelector from "../../components/NFTSelector";
import { Stepper } from "../../components/NFTSelector/Stepper";
import { BannerContext } from "../../context/BannerContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CollectionPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();
  const { config } = useContext(BannerContext);

  useEffect(() => {
    // If no "type" or "style", redirect to start
    // User needs to start from beginning
    if (config.type === "DEFAULT" || !config.style) {
      push("/create/social");
    }
  }, [config, push]);

  if (config.type === "DEFAULT" || !config.style) {
    return null;
  }

  return (
    <section className="m-10 mt-4">
      <div className="w-full flex flex-col items-center mb-[200px]">
        <Stepper currentStep={3} steps={3} />
        <h1 className="text-center font-bold text-3xl mb-2">
          Create an <span className="text-indigo-500">NFT</span> banner
        </h1>
        <p className="text-center text-lg mb-10">
          Choose 3 NFTs from your collection to build into your banner image.
        </p>
        {((wallet?.type === "stargaze" && wallet?.adress) ||
          config.manualWalletAddress?.length > 0) && (
          <NFTSelector address={wallet?.adress ?? config.manualWalletAddress} />
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
