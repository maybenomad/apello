import Image from "next/image";
import { useState } from "react";

import Modal from "../components/Modal";

const csx = (...args) => args.filter(Boolean).join(" ");

const APELLO_COLOR = "rgb(250, 197, 0)";

function Main() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative mb-12"
        style={{
          width: 500,
          height: 500,
          backgroundImage: "url(/apello-astronaut.png)",
          backgroundSize: "cover",
        }}
      >
        <Image
          src="/juno-home.png"
          alt="terra blockchain"
          className="absolute top-[35%] left-[22%] w-[12%] animate-bounce-float"
          width={60}
          height={80}
        />
        <Image
          src="/tokens/tori.png"
          alt="teritori blockchain"
          className="absolute top-[41%] right-[10%] w-[12%] border-white border-2 rounded-full animate-bounce-float"
          width={60}
          height={80}
        />
        <Image
          src="/stargaze-home.png"
          alt="stargaze blockchain"
          className="absolute bottom-[20%] right-[22%] w-[12%] animate-bounce-float"
          width={60}
          height={80}
        />
        <Image
          src="/terra sdt.png"
          alt="juno blackchain"
          className="absolute bottom-[20%] left-[22%] w-[12%] animate-bounce-float"
          width={60}
          height={80}
        />
      </div>
      <h2
        className={csx(
          "text-center",
          "mb-3 sm:mb-6 text-4xl sm:text-6xl tracking-wide",
          "font-bold uppercase drop-shadow-text-sm lg:drop-shadow-apello",
          "selection:bg-bleu selection:text-[#171819]"
        )}
      >
        Evolving The Cosmos
      </h2>
      <p className="mb-2 text-center text-[#e5e5e5] font-jura text-3xl selection:bg-violet ">
        The Premier Toolkit for <b>Cosmos</b> NFT Communities
      </p>
      {/* <p className="text-center text-[#e5e5e5] font-jura font-bold text-lg selection:bg-violet ">
        Free and Open Source, Forever
      </p> */}
      <div className="flex flex-row mt-4">
        <Metric description="Servers Using Apello" value={42069} />
        <Metric description="Holders Verified" value={69420} />
      </div>
      <div className="flex flex-row mt-8 gap-x-8">
        <Button>
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
    </div>
  );
}

function Button({ children }) {
  return (
    <button
      className="relative flex items-center gap-x-4 justify-center text-2xl pt-4 pb-4 pl-8 pr-8 text-fauxblack tracking-wider bg-apello rounded-xl"
      style={{}}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children }) {
  return (
    <button
      className="text-2xl pt-4 pb-4 pl-8 pr-8 text-apello tracking-wider border-apello rounded-xl border-2"
      style={{}}
    >
      {children}
    </button>
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

export default function Home() {
  return (
    <section className="flex flex-col">
      <Main />
    </section>
  );
}

function OldHome() {
  const [botModalOpen, setBotModalOpen] = useState(false);

  return (
    <>
      <section className="container px-[2%] mt-[10%] md:mt-4  mx-auto">
        <div className="flex flex-wrap items-center relative mx-auto">
          <div className="w-full md:w-1/2 py-[5%] lg:px-[5%]    content-center ">
            <h2 className="mb-3 sm:mb-6 text-4xl sm:text-5xl  tracking-wide  font-bold uppercase  drop-shadow-text-sm lg:drop-shadow-text-lg selection:bg-bleu selection:text-[#171819]">
              {" "}
              Let&apos;s build bridges not walls
            </h2>
            <p className="text-[#e5e5e5] font-jura text-lg selection:bg-violet ">
              Take your DAO to the next level with APELLO!
            </p>
            <div className="flex gap-x-8 ">
              <button
                onClick={() => setBotModalOpen(!botModalOpen)}
                className="relative inline-block uppercase tracking-wide text-center px-4 py-2 my-9 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-violet group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-violet group-hover:bg-violet"></span>
                <span className="relative text-black group-hover:text-white">
                  invite apello
                </span>
              </button>

              {botModalOpen && (
                <Modal
                  title="invite bot"
                  isOpen={botModalOpen}
                  handleClose={() => setBotModalOpen(!botModalOpen)}
                >
                  <div className="flex flex-col justify-between mx-auto">
                    <div className="flex flex-col justify-center items-center py-8 gap-y-4 ">
                      {/* <a href='https://discord.com/api/oauth2/authorize?client_id=1047250675324690592&permissions=268527680&scope=bot' className="px-3 py-3 w-60 rounded bg-[#212529] shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-500 hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] uppercase font-azonix">invite bot</a> */}
                      <a
                        href="https://discord.com/api/oauth2/authorize?client_id=1047250675324690592&permissions=268527680&scope=bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" px-3 py-3 w-60 bg-black rounded text-base font-medium uppercase tracking-wide text-center  text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-700 hover:shadow-[inset_240px_0_0_rgba(108,99,255,0.99)] border-solid border-violet border-2"
                      >
                        apello token gating
                      </a>
                      <a
                        href="https://bit.ly/ApelloSalesTracker"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" px-3 py-3 w-60 bg-black rounded text-base font-medium uppercase tracking-wide text-center  text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-700 hover:shadow-[inset_240px_0_0_rgba(108,99,255,0.99)] border-solid border-violet border-2"
                      >
                        apello sales tracker
                      </a>
                    </div>
                  </div>
                </Modal>
              )}
              <a
                href="https://use.apello.xyz/"
                target="_blank"
                rel="license noreferrer"
                className="relative inline-block uppercase tracking-wide text-center px-4 py-2 md:py-3 my-9 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-violet group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-violet group-hover:bg-violet"></span>
                <span className="relative text-black group-hover:text-white">
                  Apello Docs
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
