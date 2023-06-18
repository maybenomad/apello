import Image from "next/image";
import { useState } from "react";

import Footer from "../components/Footer";
import Modal from "../components/Modal";

export default function Home() {
  const [botModalOpen, setBotModalOpen] = useState(false);

  //255,203,2
  /** dropdown left
   * <div className="group relative w-fit">
                    <div className=" flex items-center gap-1 max-w-fit bg-black rounded text-base font-medium uppercase tracking-wide text-center  text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc  my-9 shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-700 hover:shadow-[inset_170px_0_0_rgba(108,99,255,0.99)] border-solid border-violet border-2">
                      Add to Server<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                    <div aria-label="drop_down" className={`hidden group-hover:flex hover:flex transition-[display] delay-700 bg-noir overflow-visible w-auto absolute top-0 left-[105%] py-3 rounded shadow  z-20 `} >
                      <div className="px-4  " >
                        <a href={"/sales?chain=juno"} className="block p-1 mb-2 text-base text-white whitespace-nowrap hover:text-violet transition-colors">server 1</a>
                        <a href={"/sales?chain=stargaze"}className="p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors">server 2</a>
                      </div>
                    </div>
                  </div>
   */
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
                className=" block max-w-fit bg-violet rounded text-base font-medium uppercase tracking-wide text-center  text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc  my-9 shadow-[inset_0_0_0_rgba(0,0,0,0.6)] ease-out duration-500 hover:shadow-[inset_144.4px_0_0_rgba(0,0,0,0.99)] border-solid border-violet border-2"
              >
                invite apello
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
                href="https://apello.gitbook.io/apello"
                target="_blank"
                rel="license noreferrer"
                className=" block max-w-fit bg-black rounded text-base font-medium uppercase tracking-wide text-center  text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc  my-9 shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-500 hover:shadow-[inset_144.4px_0_0_rgba(108,99,255,0.99)] border-solid border-violet border-2"
              >
                Apello Docs
              </a>
            </div>
            {/*<div className="flex justify-evenly ">
                      <input type="button" value={'Add to server'} className="bg-bleu rounded-md text-base font-medium uppercase tracking-wide text-center text-noir px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc hover:bg-orange/90 " />
                      <input type="button" value={'Add to app'} className="bg-bleu rounded-md text-base font-medium uppercase tracking-wide text-center text-noir px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc hover:bg-orange/90 " />

                  </div>*/}
          </div>

          <div className="w-full md:w-1/2 lg:px-[5%] ">
            <div className="relative ">
              <Image
                src="/apello-01-01.png"
                alt="Home image"
                className="!h-full"
                width={600}
                height={600}
              />
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
                className="absolute top-[41%] right-[30%] w-[12%] border-white border-2 rounded-full animate-bounce-float"
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
