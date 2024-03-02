import { ChainInfoID } from "@noahsaso/cosmodal";
import Image from "next/image";

const ModalConnection = ({ open, close }) => {
  // @noahsaso/cosmodal
  const stargazeClick = () => {
    connectToChain(ChainInfoID.Stargaze1);
    close();
  };
  const osmosisClick = () => {
    connectOsmo();
    close();
  };
  const injectiveClick = () => {
    connectToChain(ChainInfoID.Injective1);
    close();
  };
  const chihuahuaClick = () => {
    connectToChain(ChainInfoID.Chihuahua1);
    close();
  };
  const junoClick = () => {
    connectToChain(ChainInfoID.Juno1);
    close();
  };
  const omniClick = () => {
    connectOmniFlix();
    close();
  };
  const teritoriClick = () => {
    connectToChain("teritori-1");
    close();
  };
  const passageClick = () => {
    connectToChain("passage-2");
    close();
  };

  const ninjaInjClick = () => {
    connectInjNinji();
    close();
  };
  // @terra-money/wallet-provider
  const terraClick = () => {
    connecterra();
    close();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed w-screen inset-0 bg-black/50 z-50 flex justify-center items-center opacity-100 transition-opacity duration-1000"
      aria-label="modal"
    >
      <div className="bg-noir rounded md:left-auto left-[-43%] top-0 absolute md:relative flex flex-col justify-center m-8 max-w-sm md:w-full p-6 opacity-100 md:pb-20">
        <div className="relative w-full">
          <h2 className="font-jura font-bold text-xl">Connect wallet</h2>
          <button
            className="absolute top-0 right-0 p-1 rounded-full transition-colors hover:bg-black/20"
            aria-label="close modal"
            onClick={close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="pt-12  flex flex-col justify-center items-center gap-y-4">
          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={stargazeClick}
          >
            <Image
              src="/chains/stargaze.png"
              height="24"
              width="24"
              className="h-6"
              alt="stargaze logo"
            />
            <span className="font-azonix ">Stargaze</span>
          </button>
          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={teritoriClick}
          >
            <Image
              src="/chains/teritori.png"
              height="24"
              width="24"
              className="h-6"
              alt="Teritori wallet logo"
            />
            <span className="font-azonix ">Teritori</span>
          </button>
          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={omniClick}
          >
            <Image
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/omniflixhub/images/flix.svg"
              height="24"
              width="24"
              className="h-6"
              alt="OmniFlix wallet logo"
            />
            <span className="font-azonix ">OmniFlix</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={osmosisClick}
          >
            <Image
              src="https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/chainImg/_chainImg.svg"
              height="24"
              width="24"
              className="h-6"
              alt="osmo wallet logo"
            />
            <span className="font-azonix ">Osmosis</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={injectiveClick}
          >
            <Image
              src="https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/injective/chainImg/_chainImg.svg"
              height="24"
              width="24"
              className="h-6"
              alt="injective logo"
            />
            <span className="font-azonix ">Injective</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={ninjaInjClick}
          >
            <Image
              src="https://ipfs-gw.stargaze-apis.com/ipfs/Qme2Ha4MxnA5rXDb5iGTioxDk5qXvqGkjJLg7PUytFkgRt"
              height="24"
              width="24"
              className="h-6"
              alt="injective logo"
            />
            <span className="font-azonix ">Injective Ninji</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={chihuahuaClick}
          >
            <Image
              src="https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/chihuahua/chainImg/_chainImg.svg"
              height="24"
              width="24"
              className="h-6"
              alt="stargaze logo"
            />
            <span className="font-azonix ">Chihuahua</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={passageClick}
          >
            <Image
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/passage/images/pasg.png"
              height="24"
              width="24"
              className="h-6"
              alt="passage logo"
            />
            <span className="font-azonix ">Passage</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={junoClick}
          >
            <Image
              src="/chains/juno.png"
              height="24"
              width="24"
              className="h-6"
              alt="juno logo"
            />
            <span className="font-azonix ">Juno</span>
          </button>

          <button
            className="inline-flex gap-x-2 px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(230,150,0,1)]"
            onClick={terraClick}
          >
            <Image
              src="/terra_station.png"
              height="24"
              width="24"
              className="h-6"
              alt="tera station logo"
            />
            <span className="font-azonix ">Terra</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConnection;
