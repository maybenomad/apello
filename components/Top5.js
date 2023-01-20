import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Top5 = () => {
    const [list, setList ] = useState([]);
    const [query,setQuery] = useState(7)
    const router = useRouter();
    //console.log("ch",router.query.chain);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/top5?day=${query}${ (router.query.chain) && "&chain="+router.query.chain}`);
            console.log(res)
            const { count, sales} = res.data;
            console.log(count,query);
            setList(sales);

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },[query])
    return ( 
        <div className="rounded-2xl my-5 p-2 bg-noir text-[#85848b]">
            
            <div className="flex flex-col md:flex-row gap-2 justify-between mb-2 pb-1 border-b-2">
                <h3 className="capitalize basis-full text-2xl font-mono text-blanc ">top collections</h3>
                <div className="basis-auto flex gap-2 mb-1 ">
                    <input type="button" onClick={()=>setQuery(1)} className={`cursor-pointer ${query===1 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="1 Day" />
                    <input type="button" onClick={()=>setQuery(7)} className={`cursor-pointer ${query===7 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="7 Days" />
                    <input type="button" onClick={()=>setQuery(30)} className={`cursor-pointer ${query===30 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="30 Days" />
                    <input type="button" onClick={()=>setQuery(null)} className={`cursor-pointer ${query===null && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="All Time" />
                </div>
            </div>
            <div className={` px-2 mx-auto flex flex-col md:flex-row ${(list.length<=3 ? "justify-start  gap-x-10" : "justify-between" )}  `}>
                {
                    list.map((sale,i) => (
                    <div key={i} className="text-lg flex flex-row md:flex-col items-center gap-2 p-2 rounded-lg hover:bg-black/25 cursor-pointer"> 
                        
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center"><img src={sale.collectionImage} alt={sale.CollectionName} className="" /></div>
                        <div className="flex flex-col ">
                            <span className="text-lg capitalize">{sale.CollectionName}</span>
                            <div className="flex items-center gap-x-1">
                                <span className="text-lg ">{(Math.round(sale.amountSum * 100) / 100).toFixed(2)} </span>
                                { router.query.chain ==="juno" ? (<Image src="/usdc.png" alt="usdc coin" className="  " width={20} height={20}  />) : ( <img src="https://www.stargaze.zone/icon.svg" height={20} width={20} alt="stargaze coin" className="" /> ) }
                            </div>
                        </div>
                    </div>))

                }
                
                
            </div>
        </div>
     );
}
 
export default Top5;