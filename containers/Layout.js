import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";

const Layout = ({ children }) => {
    return ( 
        <div className="App relative text-blanc h-full md:min-h-screen overflow-hidden w-full">
            <ParticlesBg />
            <Navbar />
            {children}
        </div>
     );
}
 
export default Layout;