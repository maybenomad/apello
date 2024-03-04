import Image from "next/image";

import Button from "./Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { CHAINS } from "../lib/chains";
import csx from "../lib/csx";
import useOutsideClick from "../hooks/useOutsideClick";

function displayAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function ChainOption({ chain, connect }) {
  return (
    <div
      className={csx(
        "flex gap-x-3 py-1",
        "cursor-pointer hover:text-apello transition duration-200"
      )}
      onClick={() => connect(chain.name.toLowerCase())}
    >
      <Image
        src={`/chains/${chain.name.toLowerCase()}.svg`}
        height={20}
        width={20}
        alt={chain.name}
      />
      {chain.name}
    </div>
  );
}

function ChainSelect({ connect, close }) {
  const ref = useOutsideClick(close);

  return (
    <div
      ref={ref}
      className={csx(
        "absolute flex flex-col z-50 bg-fauxblack py-4 pl-5 pr-[64px] md:pr-12",
        "text-xl md:rounded-xl",
        "border-l border-b border-bwhite",
        "top-[-16px] md:top-[70px] right-[-24px] md:right-[0px]",
        "animate-slide-from-right-mobile md:animate-slide-from-right"
      )}
    >
      {CHAINS.filter((x) => x.supported).map((chain) => (
        <ChainOption key={chain.name} chain={chain} connect={connect} />
      ))}
    </div>
  );
}

function WalletInfo({ wallet }) {
  return (
    <div className="flex gap-x-4">
      <Image
        src={`/chains/${wallet.type}.svg`}
        width={20}
        height={20}
        alt={wallet.type}
      />
      {displayAddress(wallet.address)}
    </div>
  );
}

export default function ConnectButton() {
  const { connect, disconnect, view, wallet } = useAuthContext();
  const [isChainSelectorOpen, setChainSelectorOpen] = useState(false);

  function connectAndCloseSelector(chainName) {
    connect(chainName);
    setChainSelectorOpen(false);
  }

  return (
    <div className="relative flex">
      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          wallet ? view() : setChainSelectorOpen(true);
        }}
      >
        <span className="whitespace-nowrap">
          {wallet ? <WalletInfo wallet={wallet} /> : "Connect Wallet"}
        </span>
      </Button>
      {wallet && (
        <Image
          onClick={disconnect}
          className="ml-4 hover:opacity-80 cursor-pointer"
          src="/log-out-outline.svg"
          height={30}
          width={30}
          alt="Disconnect"
        />
      )}
      {isChainSelectorOpen && (
        <ChainSelect
          connect={connectAndCloseSelector}
          close={() => setChainSelectorOpen(false)}
        />
      )}
    </div>
  );
}
