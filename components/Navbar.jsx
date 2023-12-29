import Link from "next/link";
import { useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

import { useAuthContext } from "../hooks/useAuthContext";
import { DisconnectButton } from "./DisconnectButton";
import WalletCnx from "./WalletCnx";
import { CoinImage } from "./Cards/SalesCard";

const Navbar = () => {
  const { wallet } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };
  //<img src="/assets/ApeLogo.png" alt="logo" className="h-10  object-cover"   />
  return (
    <header
      className="relative h-20 p-1 md:p-2 text-white"
      aria-label="primary navigation"
    >
      <div className="relative flex ">
        <div className="flex min-w-fit h-full">
          <Link href="/" className="pt-2 md:pt-0 flex items-center">
            <img src="/lyre-08.png" alt="logo" className="h-10  object-cover" />{" "}
            <h2 className="text-xl ml-0 font-bold  uppercase ">Apello</h2>
          </Link>
        </div>

        <ul
          className={`absolute top-[70px] left-0 right-0 md:inset-0 md:relative w-full h-[calc(100vh-70px)] md:h-auto z-30 bg-noir md:bg-transparent self-center flex flex-col md:flex-row justify-center items-center uppercase     gap-y-5 gap-x-3 ${
            menuOpen ? "translate-x-0 " : "-translate-x-full bg-transparent"
          }  md:translate-x-0 ease-in-out duration-300`}
        >
          <li className="text-xl ml-0 font-bold">
            <Link
              href="/holder"
              onClick={toggleClick}
              className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3 selected"
            >
              Holders
            </Link>
          </li>
          <li className="group relative ml-0 font-bold  ">
            <div className="group-hover:text-violet cursor-pointer flex items-center gap-1 text-xl p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3  ">
              <span className="">Sales</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div
              aria-label="drop_down"
              className={`hidden group-hover:flex hover:flex bg-noir overflow-visible w-40 absolute top-9 left-0 py-3 rounded shadow  z-20 `}
            >
              <div className="px-4  ">

                <Link
                  href={"/sales?chain=stargaze"}
                  onClick={toggleClick}
                  className="block p-1 pr-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1 items-center" >
                    <CoinImage chain="stargaze" /> Stargaze
                  </span>
                </Link>
                <Link
                  href={"/sales?chain=injective"}
                  onClick={toggleClick}
                  className="block p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1  items-center" >
                    <CoinImage chain="injective" /> Injective
                  </span>
                  
                </Link>
                <Link
                  href={"/sales?chain=teritori"}
                  onClick={toggleClick}
                  className="block p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1 items-center" >
                    <CoinImage chain="teritori" token="Tori" /> Teritori 
                  </span>
                  
                </Link>
                <Link
                  href={"/sales?chain=juno"}
                  onClick={toggleClick}
                  className="block p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1 items-center" >
                    <CoinImage chain="juno" /> Juno
                  </span>
                  
                </Link>
                <Link
                  href={"/sales?chain=passage"}
                  onClick={toggleClick}
                  className="block p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1 items-center" >
                    <CoinImage chain="passage"/> Passage 
                  </span>
                  
                </Link>
                <Link
                  href={"/sales?chain=chihuahua"}
                  onClick={toggleClick}
                  className="block p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  <span className="inline-flex gap-1 items-center" >
                    <CoinImage chain="chihuahua"/> CHIHUAHUA 
                  </span>
                  
                </Link>
              </div>
            </div>
          </li>
          <li className="group relative text-xl font-bold">
            <div className="group-hover:text-violet cursor-pointer flex items-center gap-1 text-xl p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3  ">
              <span className="">Calendar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div
              aria-label="drop_down"
              className={`hidden group-hover:flex hover:flex bg-noir overflow-visible w-auto absolute top-9 left-0 py-3 rounded shadow  z-20 `}
            >
              <div className="px-4  ">
                <Link
                  href={"/calendar"}
                  onClick={toggleClick}
                  className="block p-1 mb-2 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                >
                  view{" "}
                </Link>
                {!wallet ? (
                  <div
                    data-tip="Connect your wallet first."
                    className="relative hover:disableSpan"
                  >
                    <button
                      disabled
                      className="disabled:cursor-not-allowed p-1 uppercase text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                    >
                      add collection
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/calendar/create"
                    onClick={toggleClick}
                    className="p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors"
                  >
                    add collection
                  </Link>
                )}
              </div>
            </div>
          </li>
          <li className="text-xl font-bold">
            <Link
              href="https://zeus.apello.xyz/create"
              onClick={toggleClick}
              className="hover:text-violet p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected"
            >
              Image Creator
            </Link>
          </li>
          <li className="text-xl font-bold group-hover:text-violet">
            <Link
              href="#"
              onClick={toggleClick}
              className=" p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected selected-dis"
            >
              Snapshot
            </Link>
          </li>

          {wallet && (
            <li className="text-xl font-bold md:hidden">
              <DisconnectButton showText />
            </li>
          )}
        </ul>

        <WalletCnx />

        {!menuOpen && (
          <button
            className="absolute right-1 top-1 md:hidden"
            onClick={toggleClick}
            id="open"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        {menuOpen && (
          <button
            className="absolute right-1 top-1  md:hidden"
            id="close"
            onClick={toggleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <div
          className="fixed right-0.5 bottom-4 z-30 flex flex-col gap-y-2 text-[#c4c4c4] "
          aria-label="social media section"
        >
          <a
            href="https://github.com/Apello-xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 lg:px-3 "
          >
            <FaGithub
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-white "
            />
          </a>
          <a
            href="https://twitter.com/apelloxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 lg:px-3 "
          >
            <FaTwitter
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-white"
            />
          </a>
          {/* <a
            href="f"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 lg:px-3 "
          >
            <FaTelegramPlane
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-white "
            />
          </a> */}
          <a
            href="https://discord.gg/caalabs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 lg:px-3"
          >
            <FaDiscord
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-white"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
