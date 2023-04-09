import Head from "next/head";
import { useRouter } from "next/router";
import FileHeader from "../components/FileHeader";
import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";

const Layout = ({ children }) => {
    const { locale, pathname } = useRouter();
    //'/signin', '/register',
    const noNav =  [ '/calendar', '/calendar/create'];
    return ( 
        <div className={`App ${(noNav.includes(pathname)) && "bg-black"} relative text-blanc h-full min-h-screen overflow-hidden w-full`}>
            {/* <Head>
                <title>Apello</title>
                <link rel="icon" type="image/svg+xml" href="/lyre-08.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head> */}
            <FileHeader appPath="/" title="apello" description="apello plateform" keywords="mouad" />
            {!(noNav.includes(pathname)) && <ParticlesBg />}
            <Navbar />
            {children}
        </div>
     );
}
 
export default Layout;