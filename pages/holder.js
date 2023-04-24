import Image from "next/image";
import Stepper from "../components/Stepper";

const HolderSection = () => {
  return (
    <section>
      <a className="relative block w-full max-w-2xl px-5 md:mx-auto" href="https://discord.gg/7bwXQU77bC" target="_blank" rel="noreferrer">
        <Image
          responsive
          width={673}
          height={164}
          alt="Cosmos Ape Alliance Generation 2 minting soon. Join the Discord."
          className="object-contain"
          src="/caa2-teaser.webp"
        />
      </a>
      <Stepper />
    </section>
  );
};

export default HolderSection;
