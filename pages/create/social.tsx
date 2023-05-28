import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Stepper } from "../../components/NFTSelector/Stepper";
import { BannerContext, BannerType } from "../../context/BannerContext";
import { SaveSnackbar } from "../../components/NFTSelector/SaveSnackbar";

const SocialPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();
  const { config, saveBannerType, saveTwitterUsername } =
    useContext(BannerContext);

  useEffect(() => {
    // Redirect to start of flow if wallet not connected
    if (wallet?.type !== "stargaze") {
      push("/create/");
    }
  }, [push, wallet]);

  return (
    <section className="m-10 mt-4">
      <div className="w-full flex flex-col items-center mb-[200px]">
        <Stepper currentStep={1} steps={3} />
        <h1 className="text-center font-bold text-3xl mb-2">
          Create an <span className="text-indigo-500">NFT</span> banner
        </h1>
        <p className="text-center text-lg mb-8">
          Let&apos;s set up the basics including your Twitter handle and where
          your banner will be used.
        </p>
        <label className="max-w-sm w-full text-lg mb-6">
          Twitter Handle (optional)
          <div className="h-[50px] relative">
            <input
              type="text"
              placeholder="username"
              className=" border text-lg rounded-lg block w-full h-full pl-12 mt-1 bg-gray-700 border-gray-500 text-white max-w-sm"
              value={config.twitterUsername}
              maxLength={15}
              onChange={(event) => {
                const value = event.target.value;
                if (/^[a-zA-Z0-9_]*$/.test(value)) {
                  saveTwitterUsername(event.target.value);
                }
              }}
            />
            <span
              role="presentation"
              className="select-none absolute top-[1px] h-[48px] flex items-center justify-center px-2.5 pb-1 border-r border-gray-600 left-[1px] lh-0 text-gray-500 text-2xl"
            >
              @
            </span>
          </div>
        </label>
        <label className="max-w-sm w-full text-lg mb-1">
          Type of Banner*
          <select
            placeholder="username"
            className=" border text-md rounded-lg block w-full p-2.5 mt-1 bg-gray-700 border-gray-500 text-white max-w-md"
            value={config.type}
            onChange={(event) => {
              saveBannerType(event.target.value as BannerType);
            }}
          >
            <option value="DEFAULT" disabled>
              -
            </option>
            <option value={BannerType.TwitterHeader}>
              Twitter Profile Header
            </option>
            <option disabled value={BannerType.General}>
              Social Media Post (coming soon)
            </option>
            <option disabled value={BannerType.DiscordServer}>
              Discord Server Banner (coming soon)
            </option>
            <option disabled value={BannerType.ProfilePhoto}>
              Profile Photo (coming soon)
            </option>
          </select>
        </label>
      </div>
      <SaveSnackbar>
        <button
          className="block w-full min-w-[200px] py-2 rounded bg-indigo-600 text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
          disabled={config.type === BannerType.DEFAULT}
          onClick={() => {
            push("/create/theme");
          }}
        >
          Next
        </button>
      </SaveSnackbar>
    </section>
  );
};

export default SocialPage;
