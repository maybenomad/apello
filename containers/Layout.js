import { useRouter } from "next/router";

import FileHeader from "../components/FileHeader";
import Navbar from "../components/Navbar";
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
        className={`App bg-fauxblack relative text-blanc min-h-screen overflow-hidden w-full flex flex-col`}
      >
        <FileHeader
          appPath="/"
          title="Apello"
          description="Evolving the Cosmos ecosystem with tooling for your community."
        />
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
