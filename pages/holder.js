import Image from "next/image";
import Stepper from "../components/Stepper";

const HolderSection = () => {
  return (
    <section className="mt-2">
      <div className="relative h-[125px] md:h-[150px] mx-auto">
        <Image
          fill
          unoptimized
          alt=""
          className="object-contain"
          src="/holder-banner.webp"
        />
      </div>
      <Stepper />
    </section>
  );
};

export default HolderSection;
