import Image from "next/image";
import Stepper from "../components/Stepper";

const HolderSection = () => {
  return (
    <section className="mt-2">
      <a className="relative block h-[125px] md:h-[150px] mx-auto" href="https://discord.gg/7bwXQU77bC" target="_blank" rel="noopener">
        <Image
          fill
          unoptimized
          alt=""
          className="object-contain"
          src="/holder-banner.webp"
        />
      </a>
      <Stepper />
    </section>
  );
};

export default HolderSection;
