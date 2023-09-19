import { useState } from "react";

const TopSale = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const card = e.target;
        const { left, top, width, height } = card.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 30; // Adjust the sensitivity here
        const y = ((clientY - top) / height - 0.5) * 30;

        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return ( 
        <div 
      className="tilt-card flex flex-col justify-center items-center gap-1 p-5 w-full min-h-[200px] bg-slate-800 shadow-inner bg-cover card bg-[url('https://ipfs-gw.stargaze-apis.com/ipfs/bafybeibs4bln5recdqpaqo5e4nt55kll35asn2d3aa2xskxq4ntqxfjjjm/images/2106.png')]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
    >

      <p className="text-white font-medium text-sm md:text-base">Today&rsquo;s Top Sale</p>
      <span className="font-extrabold text-xl md:text-2xl ">50000$ stars</span>
      <button className="self-end mt-auto  inline-flex justify-center items-center rounded text-white-1 h-[40px] py-0 px-3 hover:opacity-80 transition duration-300 ease-in-out w-full  bg-[#20162A] z-10 text-xs md:text-sm">Details</button>
    </div>
     );
}
 
export default TopSale;