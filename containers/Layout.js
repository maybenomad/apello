import { useRouter } from "next/router";

import FileHeader from "../components/FileHeader";
import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const noNav = ["/calendar", "/calendar/create"];

  return (
    <div
      className={`App ${
        noNav.includes(pathname) && "bg-black"
      } relative text-blanc h-full min-h-screen overflow-hidden w-full`}
    >
      <FileHeader
        appPath="/"
        title="Apello"
        description="Evolving the Cosmos ecosystem with tooling and utiltiy for the community."
      />
      {!noNav.includes(pathname) && <ParticlesBg />}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
