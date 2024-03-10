import Image from "next/image";

import ConnectButton from "../components/ConnectButton";
import Button from "../components/Button";
import csx from "../lib/csx";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDiscordConnection } from "../hooks/useDiscordConnection";
import * as DiscordAPI from "../interface/discord";

function VerifyStep({
  instruction,
  details = null,
  number,
  complete = false,
  children,
}) {
  return (
    <div
      className={csx(
        "flex flex-col border-y-2 md:border-2 md:rounded-xl my-2 border-bwhite",
        complete && "opacity-40",
      )}
    >
      <div className="flex text-2xl bg-fauxblack2 rounded-xl">
        <div className="flex justify-center items-center mr-4 py-2 px-6 rounded-l-xl border-r border-bwhite w-[60px]">
          {number}
        </div>
        <div className="flex flex-col w-full p-3 mb-2 md:mb-0">
          <div className="flex items-center flex-col md:flex-row">
            <div className="flex text-xl font-bold md:font-normal md:text-2xl md:mr-auto text-center items-center py-2">
              {instruction}
            </div>
            <div className="flex text-base">{children}</div>
          </div>
          {details && (
            <div className="px-2 pb-2 text-base md:text-lg">{details}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function DiscordSummary({ account }) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="text-lg">{account.globalName}</div>
      <Image
        className="rounded-md"
        src={DiscordAPI.avatarURL(account)}
        height={50}
        width={50}
        alt="Discord Avatar"
      />
    </div>
  );
}

const HolderSection = () => {
  const { wallet } = useAuthContext();
  const discordAccount = useDiscordConnection();

  return (
    <section className="relative overflow-hidden flex flex-col items-center md:justify-center h-full grow md:py-16">
      <div className="hidden md:block" id="stars" />
      <div className="hidden md:block" id="stars2" />
      <div className="hidden md:block" id="stars3" />
      <div className="flex flex-col z-10 w-full md:w-[630px]">
        <div className="flex flex-col md:border-2 border-bwhite md:rounded-xl mb-2">
          <div className="bg-fauxblack2 flex tracking-wide flex-col items-center text-lg rounded-xl p-6 gap-y-2">
            <Image
              className="w-[50%]"
              src="/tokengate.png"
              height={250}
              width={250}
              alt="Token Gate"
            />
            <div className="text-center text-xl md:text-2xl font-bold">
              Welcome to Apello Token Gate
            </div>
            <div className="text-base md:text-lg text-center">
              Link your wallet and Discord account below to verify your NFT
              holdings.
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col border-2 border-bwhite rounded-xl mb-2">
          <div className="bg-fauxblack2 flex tracking-wide flex-col items-center text-lg rounded-xl gap-y-2">

          </div>
        </div> */}
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
        {wallet && (
          <VerifyStep
            instruction="Connect Discord"
            number={2}
            complete={Boolean(discordAccount)}
          >
            {discordAccount ? (
              <DiscordSummary account={discordAccount} />
            ) : (
              <Button variant="outline" onClick={() => DiscordAPI.authorize()}>
                Connect
              </Button>
            )}
          </VerifyStep>
        )}
        {wallet && discordAccount && (
          <VerifyStep
            instruction="Your wallet has been linked!"
            number={3}
            details={
              <div className="pt-2">
                To finish receiving your roles:
                <ul className="list-disc mx-8">
                  <li className="py-3 md:py-2">
                    Return to your community&#39;s holder verification channel
                  </li>
                  <li className="pb-2">
                    Click
                    <span className="bg-green mx-2 p-2 px-4 rounded-md text-sm uppercase">
                      &#128273;&nbsp;&nbsp; Verify
                    </span>
                  </li>
                </ul>
              </div>
            }
          >
            {false}
          </VerifyStep>
        )}
      </div>
    </section>
  );
};

export default HolderSection;
