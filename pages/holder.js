import Image from "next/image";

import Stepper from "../components/Stepper";

const HolderSection = () => {
  return (
    <section>
      <a
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
      <Stepper />
    </section>
  );
};

export default HolderSection;
