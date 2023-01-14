import { useState } from "react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const SalesCard = ({amount, buyer, chain, contract, createdAt, nftID, transactionID, CollectionName, collectionImage, nftImage}) => {
    const [ show, setShow ] = useState(false);
    return ( 
        <div>
            <div className="p-4 flex gap-4">
                <img className="basis-[50px] rounded-xl" src={(nftImage && (CollectionName!=='rektbulls' && !CollectionName.includes("levana"))) ? nftImage : collectionImage} alt="" width="50" height="50" />
                <div className="flex basis-full flex-col justify-around  text-sm">
                    <span className="font-semibold capitalize ">{`${CollectionName ? CollectionName : ''} # ${nftID}` }</span>
                    <div className="flex justify-center items-center py-1 font-normal px-2 h-fit w-fit rounded-2xl bg-violet/80">
                        <p className="m-0 text-xs leading-[1]">Sale</p>
                    </div>
                </div>
                <div className="basis-40 flex flex-col justify-around items-end">
                    <div className="flex gap-x-2">
                        <img src="/usdc.png" className="h-5" alt="juno logo" />
                        <p className="">{amount}</p>
                        <button onClick={()=>setShow(!show)} className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${show ? 'hidden' : 'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${show ? 'block' : 'hidden'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>


                    </div>
                    <div className="flex gap-x-2">
                        <p className="text-[#85848b] whitespace-nowrap">{formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true })}</p>
                        <a href={`https://www.mintscan.io/juno/txs/${transactionID}`} target="_blank" rel="noreferrer" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>

                        </a>
                    </div>

                </div>

            </div>
            <div className={`p-4 ${show ? 'block' : 'hidden'} flex justify-between`}>
                <span className="font-jura">Buyer</span>
                <div className="flex gap-x-2">
                    <img src="/juno.png" className="h-5" alt="juno logo" />
                    <p className="">{buyer.substring(0,5)+'...'+buyer.substring(buyer.length-5,buyer.length)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default SalesCard;