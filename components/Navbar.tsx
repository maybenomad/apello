import Link from "next/link";

import { useAuthContext } from "../hooks/useAuthContext";
import { DisconnectButton } from "./DisconnectButton";
import WalletCnx from "./WalletCnx";
import { CoinImage } from "./Cards/SalesCard";
import Header from "./Header";
import csx from "../lib/csx";

type Chain = {
  name: string;
  token?: string;
};

function SalesDropdown({ chains }: { chains: Chain[] }) {
  return (
    <Header.MenuDropdown text="Sales">
      {chains.map((chain) => (
        <Header.MenuDropdownLink
          key={chain.name}
          href={`/sales?chain=${chain.name.toLowerCase()}`}
        >
          <CoinImage chain={chain.name.toLowerCase()} token={chain.token} />
          {chain.name}
        </Header.MenuDropdownLink>
      ))}
    </Header.MenuDropdown>
  );
}

export default function Navbar() {
  const { wallet } = useAuthContext();

  return (
    <Header>
      <Link href="/" className="flex items-center">
        <img
          src="/logo-apello-lyre.png"
          className="relative ml-2 mr-6 h-10 md:h-14 object-cover"
        />
        <div
          className={csx(
            "relative text-xl md:text-3xl tracking-wider font-bold uppercase left-[-8px]"
          )}
        >
          Apello
        </div>
      </Link>

      <Header.Menu>
        <Header.MenuLink text="Holders" href="/holder" />
        <SalesDropdown
          chains={[
            { name: "Stargaze" },
            { name: "Injective" },
            { name: "Teritori", token: "Tori" },
            { name: "Juno" },
            { name: "Passage" },
            { name: "Chihuahua" },
          ]}
        />
        <Header.MenuDropdown text="Calendar">
          <Header.MenuDropdownLink href="/calendar">
            View
          </Header.MenuDropdownLink>
          <Header.MenuDropdownLink
            disabled={!Boolean(wallet)}
            href="/calendar/create"
          >
            <div
              className="relative hover:disableSpan"
              data-tip={!Boolean(wallet) && "Connect your wallet first"}
            >
              Add Collection
            </div>
          </Header.MenuDropdownLink>
        </Header.MenuDropdown>
        <Header.MenuLink
          text="Image Creator"
          href="https://zeus.apello.xyz/create"
        />
        <Header.MenuLink text="Snapshot" disabled />
        <Header.MenuLink text="Docs" href="https://use.apello.xyz" newTab />
      </Header.Menu>

      <div className="ml-auto mr-2 md:mx-2 text-sm md:text-md flex justify-center items-center">
        {wallet && (
          <li className="text-xl font-bold md:hidden">
            <DisconnectButton showText />
          </li>
        )}
        <WalletCnx />
      </div>
    </Header>
  );
}
