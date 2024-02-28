import Link from "next/link";

import { useAuthContext } from "../hooks/useAuthContext";
import { DisconnectButton } from "./DisconnectButton";
import WalletCnx from "./WalletCnx";
import { CoinImage } from "./Cards/SalesCard";
import Header from "./Header";

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

export default function Navbar(props) {
  const { wallet } = useAuthContext();

  return (
    <Header>
      <Link href="/" className="pt-2 md:pt-0 flex items-center">
        <img
          src="/logo_apello_full.png"
          className="relative ml-4 h-12 object-cover"
          style={{ top: "-2px" }}
        />
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

        {wallet && (
          <li className="text-xl font-bold md:hidden">
            <DisconnectButton showText />
          </li>
        )}
      </Header.Menu>

      <div className="ml-2 text-lg">
        <WalletCnx />
      </div>
    </Header>
  );
}
