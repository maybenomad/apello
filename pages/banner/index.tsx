import React, { useEffect } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTerra } from "../../hooks/useTerra";

const BannerPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();
  const { connectStargaze } = useTerra();

  useEffect(() => {
    if (wallet?.type === "stargaze") {
      push("/banner/social");
    }
  }, [push, wallet]);

  return (
    <section className="m-10">
      <div className="w-full flex flex-col items-center mb-[200px]">
        <h1 className="text-center font-bold text-5xl mb-1">
          Create an <span className="text-indigo-500">NFT</span> banner
        </h1>
        <p className="text-center text-lg mb-8">
          Select NFTs from your <em>Stargaze</em> collections to build a dynamic
          socials image
        </p>
        <button
          className="select-none flex items-center px-2 py-1 rounded-md border-solid border-violet border-2"
          onClick={connectStargaze}
        >
          <div className="relative h-6 w-6">
            <Image fill src="/chains/stargaze.png" alt="Stargaze logo" />
          </div>
          <span className="whitespace-nowrap ml-1">Connect Stargaze</span>
        </button>
      </div>
    </section>
  );
};

export default BannerPage;
