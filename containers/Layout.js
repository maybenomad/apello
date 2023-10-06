import { useRouter } from "next/router";

import FileHeader from "../components/FileHeader";
import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";
import Head from "next/head";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const noNav = ["/calendar", "/calendar/create"];

  return (
    <>
      <Head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>
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
    </>
  );
};

export default Layout;
