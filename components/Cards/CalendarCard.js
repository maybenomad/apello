import { formatDistanceToNowStrict } from "date-fns";

//
export const Chain = ({name}) => {
    let chainUrl;
    switch(name) {
        case 'terra': 
            chainUrl = "/terra_station.png";
            break;
        case 'juno': 
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/juno/chainImg/logoImg/chainImg.svg";
            break;
        case 'stargaze': 
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/stargaze/chainImg/logoImg/chainImg.svg";
            break;
        case 'teritori': 
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/teritori/chainImg/logoImg/chainImg.svg";
            break;
        default:
            chainUrl = "/terra_station.png";
    }

    return ( <img src={"/chains/"+name+".png"} className="h-8" alt={name} />)
}

export const Token = ({name}) => {
    return ( <img src={"/tokens/"+name+".png"} className="h-6" alt={name} />)
}

const CalendarCard = ({collectionName, collectionSize, collectionImage, mintPrice, mintDate, chain, mintToken, discordLink, twitterLink, websiteLink}) => {
    return ( 
        <div className="rounded-lg text-center max-w-full overflow-hidden border border-[#24182f] hover:scale-105 cursor-pointer transition-all ">
            <div className="relative mb-1">
                <img  src={collectionImage} alt="collection profile" className={`h-[265px] w-full`} />
                <div className="relative px-1 -top-4 w-fit mx-auto ">
                    <Chain name={chain} />
                </div>
            </div>
            <h5 className="text-[#f5f3f7] font-bold px-5 capitalize truncate ">{collectionName}</h5>
            <span className="block text-violet font-light px-5 truncate ">{formatDistanceToNowStrict(new Date(mintDate), { addSuffix: true })}</span>
            <div className="flex gap-x-2 justify-between capitalize p-2">
                <div className="flex items-center justify-center gap-x-1 rounded  px-1 overflow-hidden">
                    <label htmlFor="collectionSize" className="">size: </label>
                    <span className="font-bold truncate">{collectionSize}</span>
                </div>
                <div className="flex items-center justify-center gap-x-1 rounded py-2 px-1 overflow-hidden">
                    <label htmlFor="collectionprice" className="">price: </label>
                    <span className="font-bold truncate">{mintPrice}</span>
                    <span className="">{mintToken}</span>
                </div>
            </div>
        </div>
     );
}
 
export default CalendarCard;