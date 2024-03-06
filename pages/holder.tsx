import Image from "next/image";

import ConnectButton from "../components/ConnectButton";
import Button from "../components/Button";
import csx from "../lib/csx";
import { useAuthContext } from "../hooks/useAuthContext";

function VerifyStep({
  instruction,
  details = "",
  number,
  complete = false,
  children,
}) {
  return (
    <div
      className={csx(
        "flex flex-col border-2 rounded-xl my-2 border-bwhite",
        complete && "opacity-40",
      )}
    >
      <div className="flex text-2xl bg-fauxblack2 rounded-xl">
        <div className="flex justify-center items-center mr-4 py-2 px-6 rounded-l-xl border-r border-bwhite w-[60px]">
          {number}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex p-2">
            <div className="flex mr-auto items-center">{instruction}</div>
            <div className="flex text-base">{children}</div>
          </div>
          {details && <div className="px-2 py-4 text-lg">{details}</div>}
        </div>
      </div>
    </div>
  );
}

const HolderSection = () => {
  const { wallet } = useAuthContext();

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center h-full grow py-16">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div className="flex flex-col z-10 w-1/4">
        <div className="flex flex-col border-2 border-bwhite rounded-xl mb-2">
          <div className="bg-fauxblack2 flex tracking-wide flex-col items-center text-lg rounded-xl p-6 gap-y-2">
            {/* <Image
              src="/tokengate.png"
              height={300}
              width={300}
              alt="Token Gate"
            /> */}
            <div className="text-center text-2xl font-bold">
              Welcome to Apello Token Gate
            </div>
            <div className="text-center">
              Link your wallet and Discord account below to verify your NFT
              holdings.
            </div>
          </div>
        </div>
        <VerifyStep
          instruction="Connect Wallet"
          number={1}
          complete={Boolean(wallet)}
        >
          <ConnectButton
            hideDisconnect
            color={Boolean(wallet) ? "green" : "apello"}
          >
            {wallet ? "✓" : "Connect"}
          </ConnectButton>
        </VerifyStep>
        <VerifyStep instruction="Connect Discord" number={2}>
          <Button variant="outline">Connect</Button>
          {false}
        </VerifyStep>
        <VerifyStep instruction="Click Verify" number={3}>
          <Button variant="outline">Back To Discord</Button>
          {false}
        </VerifyStep>
        {/* <a
          className="relative block w-full max-w-xl px-5 md:mx-auto"
          href="https://discord.gg/caalabs"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={800}
            height={150}
            alt="Join the Apello Discord server"
            className="object-contain"
            src="https://ipfs-gw.stargaze-apis.com/ipfs/QmZkBV3aGdyt5TPbp1PcTFcFaBoqTsMaUrxFC7ete3AFNH"
          />
        </a>
        <Stepper /> */}
      </div>
    </section>
  );
};

export default HolderSection;
