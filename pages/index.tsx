import Image from "next/image";
import { useState } from "react";

import csx from "../util/csx";
import Button from "../components/Button";
import Modal from "../components/Modal";
import SocialLinks from "../components/SocialLinks";

const BotInviteURL = {
  TokenGating:
    "https://discord.com/api/oauth2/authorize?client_id=1047250675324690592&permissions=268527680&scope=bot",
  SalesTracking: "https://bit.ly/ApelloSalesTracker",
};

function InviteLink({ text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={csx(
        "w-60 px-3 py-3",
        "bg-black rounded",
        "border-solid border-apello border-2",
        "text-base font-medium uppercase tracking-wide text-center text-white",
        "hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc",
        "shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-700",
        "hover:shadow-[inset_240px_0_0_rgba(230,150,0,1)]"
      )}
    >
      {text}
    </a>
  );
}

function InviteBotModal({ close }) {
  return (
    <Modal title="invite bot" isOpen={true} handleClose={close}>
      <div className="flex flex-col justify-between mx-auto">
        <div className="flex flex-col justify-center items-center py-8 gap-y-4 ">
          <InviteLink
            text="Apello Token Gating"
            href={BotInviteURL.TokenGating}
          />
          <InviteLink
            text="Apello Sales Tracker"
            href={BotInviteURL.SalesTracking}
          />
        </div>
      </div>
    </Modal>
  );
}

function Main() {
  const [botModalOpen, setBotModalOpen] = useState(false);

  return (
    <div
      className={csx(
        "relative flex flex-col items-center justify-center",
        "pb-16 overflow-hidden",
        "border-b-2 border-bwhite"
      )}
    >
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div
        className="relative mb-12 mt-8"
        style={{
          zIndex: 5,
          height: "35vh",
          width: "35vh",
          backgroundImage: "url(/apellodemotrans2.png)",
          backgroundSize: "cover",
        }}
      />
      <div
        className={csx(
          "text-center",
          "mb-3 sm:mb-6 text-6xl tracking-wide",
          "font-bold uppercase drop-shadow-text-sm lg:drop-shadow-apello",
          "selection:bg-bleu selection:text-[#171819]"
        )}
      >
        Evolving The Cosmos
      </div>
      <p className="mb-2 text-center text-[#e5e5e5] font-jura text-3xl selection:bg-violet ">
        The Premier Toolkit for <b>Cosmos</b> NFT Communities
      </p>
      <div className="flex flex-row mt-4">
        <Metric description="Servers Using Apello" value={42069} />
        <Metric description="Holders Verified" value={69420} />
      </div>
      <div className="flex flex-row mt-8 gap-x-8 text-xl">
        <Button onClick={() => setBotModalOpen(!botModalOpen)}>
          <span className="leading-8">Invite Apello</span>
          <Image
            src="/discord-mark-white.svg"
            alt="discord"
            width={32}
            height={32}
          />
          <Image
            className="absolute top-[-12%] right-[-4%]"
            src="/4858-verified.png"
            alt="discord"
            width={32}
            height={32}
          />
        </Button>
      </div>
      <SocialLinks />
      {botModalOpen && <InviteBotModal close={() => setBotModalOpen(false)} />}
    </div>
  );
}

function Metric({ description, value }) {
  return (
    <div className="m-4">
      <div className="text-4xl font-bold text-center">{value}</div>
      <div className="font-jura text-2xl">{description}</div>
    </div>
  );
}

function SupportedChains() {
  return (
    <div
      className={csx(
        "relative flex flex-col items-center justify-center",
        "pb-16 overflow-hidden"
      )}
    >
      <div
        className={csx(
          "text-center",
          "pt-16 pb-6 text-4xl tracking-wide",
          "font-bold uppercase",
          "selection:bg-bleu selection:text-[#171819]"
        )}
      >
        Supported Chains
      </div>
      <div className={csx("flex flex-row")}>
        <Image
          src="/chains/injective.svg"
          alt="Injective"
          width={100}
          height={100}
        />
        {/* <Image
          src="/chains/stargaze.svg"
          alt="Stargaze"
          width={75}
          height={75}
        />
        <Image src="/chains/terra.svg" alt="Terra" width={75} height={75} />
        <Image src="/chains/juno.svg" alt="Juno" width={80} height={80} />
        <Image
          src="/chains/chihuahua.svg"
          alt="Chihuahua"
          width={100}
          height={100}
        />
        <Image
          src="/chains/teritori.svg"
          alt="Teritori"
          width={100}
          height={100}
        />
        <Image
          src="/chains/passage.png"
          alt="Passage"
          width={100}
          height={100}
        />
        <Image
          src="/chains/omniflix.svg"
          alt="Omniflix"
          width={100}
          height={100}
        /> */}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="flex flex-col">
        <Main />
      </section>
      <section className="flex flex-col">
        <SupportedChains />
      </section>
    </>
  );
}
