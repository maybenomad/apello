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
          width={673}
          height={188}
          alt="Join the Apello Discord server"
          className="object-contain"
          src="/discord-banner.webp"
        />
      </a>
      <Stepper />
    </section>
  );
};

export default HolderSection;
