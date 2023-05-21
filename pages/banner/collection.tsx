import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";
import NFTSelector from "../../components/NFTSelector";
import { Stepper } from "../../components/NFTSelector/Stepper";

const CollectionPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();

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
        {/* <NFTSelector address="stars14mslxrqf786748jrtf5penzarpeaag8asyeuqd" /> */}
        {wallet?.type === "stargaze" && (
          <NFTSelector address="stars14mslxrqf786748jrtf5penzarpeaag8asyeuqd" />
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
