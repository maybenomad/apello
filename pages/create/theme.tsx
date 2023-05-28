import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import { ImageRadioButton } from "../../components/NFTSelector/ImageRadioButton";
import { SaveSnackbar } from "../../components/NFTSelector/SaveSnackbar";
import { Stepper } from "../../components/NFTSelector/Stepper";
import {
  BannerContext,
  BannerStyle,
  BannerType,
} from "../../context/BannerContext";

// Themes added here will get different text color on selector
const COLLAB_THEMES = [
  BannerStyle.Coinflip,
  BannerStyle.Gelotto,
  BannerStyle.PixelWizards,
];

// Themes available to be selected by type
const THEMES_BY_TYPE = {
  [BannerType.TwitterHeader]: [
    // Collabs
    BannerStyle.Coinflip,
    BannerStyle.Gelotto,
    BannerStyle.PixelWizards,
    // General
    BannerStyle.Fantasy,
    BannerStyle.Jungle,
    BannerStyle.Apeclub,
    BannerStyle.Posters,
    BannerStyle.Gallery,
    BannerStyle.Street,
  ],
  [BannerType.General]: [BannerStyle.Posters],
  [BannerType.DiscordServer]: [BannerStyle.Posters],
  [BannerType.ProfilePhoto]: [BannerStyle.ProfilePhotoCAA],
};

const ThemePage: NextPage = () => {
  const { push } = useRouter();
  const { config, saveBannerStyle } = useContext(BannerContext);

  useEffect(() => {
    // If no "type", redirect to start
    // User needs to start from beginning
    if (config.type === "DEFAULT") {
      push("/create/social");
    }
  }, [config, push]);

  if (config.type === "DEFAULT") {
    return null;
  }

  return (
    <>
      <Head>
        <title>NFT Image Creator | Cosmos Ape Alliance x Apello</title>
        <meta
          name="og:description"
          content="Create a dynamic image using NFTs from your Stargaze wallet."
        />
        <meta
          property="og:image"
          content="https://www.apello.xyz/banners/og-img-banner.jpg"
        />
      </Head>
      <section className="m-10 mt-4">
        <div className="w-full flex flex-col items-center mb-[200px]">
          <Stepper currentStep={2} steps={3} />
          <h1 className="text-center font-bold text-3xl mb-2">
            Create an <span className="text-indigo-500">NFT</span> banner
          </h1>
          <p className="text-center text-lg mb-10">
            Your choice here determines the style or theme of banner your NFTs
            are placed into.
          </p>
          <div className="w-full flex flex-wrap justify-center items-center gap-6">
            {THEMES_BY_TYPE[config.type].map((style: BannerStyle) => (
              <ImageRadioButton
                key={style}
                isCollab={COLLAB_THEMES.includes(style)}
                image={`/banners/${style}_thumb.jpg`}
                selected={config.style === style}
                handleChange={() => saveBannerStyle(style)}
                value={style}
              />
            ))}
          </div>
        </div>
        <SaveSnackbar>
          <div className="flex gap-2">
            <button
              className="block w-full min-w-[100px] py-2 rounded border border-slate-500 bg- text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
              onClick={() => {
                push("/create/social");
              }}
            >
              Back
            </button>
            <button
              className="block w-full min-w-[100px] py-2 rounded bg-indigo-600 text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed"
              onClick={() => {
                push("/create/collection");
              }}
            >
              Next
            </button>
          </div>
        </SaveSnackbar>
      </section>
    </>
  );
};

export default ThemePage;
