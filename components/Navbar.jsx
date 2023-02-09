import { useState } from "react";
import {FaTelegramPlane , FaDiscord , FaTwitter , FaGithub} from 'react-icons/fa';
import  Link  from "next/link";
import WalletCnx from "./WalletCnx";

const Navbar = () => {

    const [menuOpen,setMenuOpen] = useState(false);

    const toggleClick = () => {
        if(window.innerWidth<768){
          setMenuOpen(!menuOpen);
        }
        
      }
        //<img src="/assets/ApeLogo.png" alt="logo" className="h-10  object-cover"   />
    return ( 
    <header className="relative h-20 p-1 md:p-2 text-white" aria-label="primary navigation" >
        <div className="relative flex ">

          <div className="flex min-w-fit h-full">
            <Link href="/" className="pt-2 md:pt-0 flex items-center" ><img src="/lyre-08.png" alt="logo" className="h-10  object-cover"   /> <h2 className="text-xl ml-0 font-bold  uppercase ">Apello</h2></Link>
          </div>

          <ul className={`absolute top-[70px] left-0 right-0 md:inset-0 md:relative w-full h-[calc(100vh-70px)] md:h-auto z-30 bg-noir md:bg-transparent self-center flex flex-col md:flex-row justify-center items-center uppercase     gap-y-5 gap-x-3 ${menuOpen? "translate-x-0 " : "-translate-x-full bg-transparent"}  md:translate-x-0 ease-in-out duration-300`} >
            <li className="text-xl ml-0 font-bold  "><Link href="/holder" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3 selected  ">Holders</Link></li>
            <li className="group relative ml-0 font-bold  ">
              <div className="group-hover:text-violet cursor-pointer flex items-center gap-1 text-xl p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3  ">
                <span className="">Sales</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div aria-label="drop_down" className={`hidden group-hover:flex hover:flex bg-noir overflow-visible w-auto absolute top-9 left-0 py-3 rounded shadow  z-20 `} >
                <div className="px-4  " >
                  <Link href={"/sales?chain=juno"} onClick={toggleClick} className="block p-1 mb-2 text-base text-white whitespace-nowrap hover:text-violet transition-colors">Juno chain</Link>
                  <Link href={"/sales?chain=stargaze"} onClick={toggleClick} className="p-1 text-base text-white whitespace-nowrap hover:text-violet transition-colors">stargaze chain</Link>
                </div>
              </div>
            </li>
            <li className="text-xl font-bold"><Link href="/rarity"onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected ">Rarity</Link></li>
            <li className="text-xl font-bold"><Link href="/calendar"onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected ">Calendar</Link></li>
            <li className="text-xl font-bold"><Link href="#" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected selected-dis">stats</Link></li>
            <li className="text-xl font-bold"><Link href="#" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected selected-dis">Snapshot</Link></li> 
          </ul>

          <WalletCnx />

          { !menuOpen && <button className="absolute right-1 top-1 md:hidden" onClick={toggleClick} id="open">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 128L216 128"></path> <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 64L216 64" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 192L216 192" ></path>  </svg>
          </button>}
          { menuOpen && <button className="absolute right-1 top-1  md:hidden"  id="close" onClick={toggleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"  viewBox="0 0 256 256"> <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 56L56 200" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 200L56 56" ></path> </svg>      
          </button>}

          <div className="fixed right-0.5 bottom-4 z-30 flex flex-col gap-y-2 text-[#c4c4c4] " aria-label="social media section">        
            <a href="https://github.com/Apello-xyz/" target="_blank" rel="noopener noreferrer" className="px-1 lg:px-3 "><FaGithub size={20} className='cursor-pointer hover:scale-110 hover:text-white ' /></a>
            <a href="https://twitter.com/apelloxyz" target="_blank" rel="noopener noreferrer" className="px-1 lg:px-3 "><FaTwitter size={20} className='cursor-pointer hover:scale-110 hover:text-white' /></a>
            <a href="f" className="px-1 lg:px-3 "><FaTelegramPlane size={20} className='cursor-pointer hover:scale-110 hover:text-white ' /></a>
            <a href="f" className="px-1 lg:px-3"><FaDiscord size={20}  className=" cursor-pointer hover:scale-110 hover:text-white" /></a>
          </div>
        
        </div>


    </header> );
}
 
export default Navbar;