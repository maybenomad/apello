import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import { SaveSnackbar } from "../../components/NFTSelector/SaveSnackbar";
import { BannerContext } from "../../context/BannerContext";

const STARGAZE_WALLET_ADDRESS_LENGTH = 44;

const ManualAddressPage: NextPage = () => {
  const { push } = useRouter();
  const { config, saveManualWalletAddress } = useContext(BannerContext);

  return (
    <>
      <Head>
        <title>NFT Image Creator | Cosmos Ape Alliance x Apello</title>
        <meta
          name="description"
          content="Create a dynamic image using NFTs from your Stargaze wallet."
        />
        <meta
          property="og:image"
          content="https://www.apello.xyz/banners/og-img-banner.jpg"
        />
      </Head>
      <section className="m-10">
        <div className="w-full flex flex-col items-center mb-[200px]">
          <h1 className="text-center font-bold text-5xl mb-1">
            Create an <span className="text-indigo-500">NFT</span> banner
          </h1>
          <p className="text-center text-lg mb-8">
            Select NFTs from your <em>Stargaze</em> collections to build a
            dynamic socials image
          </p>
          <label className="max-w-sm w-full text-lg mb-6">
            Enter a Stargaze wallet address
            <div className="h-[50px] relative mt-1">
              <input
                type="text"
                maxLength={STARGAZE_WALLET_ADDRESS_LENGTH}
                placeholder="stars123..."
                className=" border text-lg rounded-lg block w-full h-full px-3 bg-gray-700 border-gray-500 text-white max-w-sm"
                value={config.manualWalletAddress}
                onChange={(event) => {
                  saveManualWalletAddress(event.target.value.trim());
                }}
              />
            </div>
          </label>
        </div>
        <SaveSnackbar>
          <button
            className="block w-full min-w-[200px] py-2 rounded bg-indigo-600 text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
            disabled={
              !config.manualWalletAddress.startsWith("stars") ||
              config.manualWalletAddress.length < STARGAZE_WALLET_ADDRESS_LENGTH
            }
            onClick={() => {
              push("/create/social");
            }}
          >
            Continue
          </button>
        </SaveSnackbar>
      </section>
    </>
  );
};

export default ManualAddressPage;
