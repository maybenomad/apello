interface Chain {
  name: string;
  ticker: string;
  supported: boolean;
}

export const CHAINS: Chain[] = [
  {
    name: "Injective",
    ticker: "INJ",
    supported: true,
  },
  {
    name: "Stargaze",
    ticker: "STARS",
    supported: true,
  },
  { name: "Juno", ticker: "JUNO", supported: true },
  {
    name: "Passage",
    ticker: "PASG",
    supported: true,
  },
  {
    name: "Chihuahua",
    ticker: "HUAHUA",
    supported: true,
  },
  {
    name: "Teritori",
    ticker: "TORI",
    supported: true,
  },
  {
    name: "Terra",
    ticker: "LUNA",
    supported: true,
  },
  {
    name: "OmniFlix",
    ticker: "FLIX",
    supported: false,
  },
];
