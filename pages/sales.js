import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import SalesCard from "../components/Cards/SalesCard";
import Top5 from "../components/Top5";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";

const Sales = () => {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const router = useRouter();
    const { loading, error, list , hasMore, sendQuery } = useFetch('sales/search', query, pageNumber,(router.query.chain) && `&chain=${router.query.chain}`);
    //console.log("rerender",list,pageNumber)
    //create a useeffect for the page initaialisation after the changing the chain
    useEffect(()=>{
        setPageNumber(0);
    },[ router.query.chain ])
    //console.log("pageNumber",pageNumber)
    
    //to reference the last element on the infinite scroll
    const observer = useRef();

    //the ref that we declared on the last element will attach that last node as an argument to the lastelement
    const lastElemet = useCallback( (node) => {
        //if it's fetching new data and it's loading we don't need to do anything
        if(loading) return;
        //if it's already observing anything then we disconnect from it to observe the new node which has been loaded recently
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
        //entries contain all the things that we're observing, in this case we are just observing one element which is the last element
        //it's always going to be an array of nodes an array of all the things that we're observing
        //console.log('observing',entries)
        if(entries[0].isIntersecting && hasMore){
            
            setPageNumber((prev) => prev+1);
        }

        
        });
        //to observe
        if(node) observer.current.observe(node);
    },[loading,hasMore]);
    //search bar
    let timer;
    const handleChange = (e) => {
        e.preventDefault();
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setQuery(e.target.value);
          setPageNumber(0);
        }, 1000);
      }
    // border-b-2 last:border-b-0
    return ( 
        <section className="h-full w-full px-7 md:px-[10%] " aria-label="tracking sales transactions">
            <Top5 />
            <div className="flex justify-between items-end mb-5">
                <h1 className="capitalize font-mono font-semibold text-2xl ">sales feed</h1>
                <div  aria-label="search by name" className="max-w-[10rem] sm:max-w-sm w-full flex items-center rounded-xl border-[1px]  focus:shadow focus:outline-none focus-visible:border-violet h-12  p-1 cursor-text ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input type="text" placeholder="Collection Name"  onChange={handleChange} 
                        className="px-1 bg-transparent outline-none w-full "
                          />
                    {query.length>0 && (<button className="" onClick={()=>setQuery('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>)}
                </div>
            </div>
            {list && <div className="rounded-2xl bg-noir my-2">
                {list?.map((sale,i) => 
                    ( list.length === i+1 ) ? 
                    ( 
                    <div key={i} className="" ref={lastElemet} >
                        <SalesCard {...sale} />
                        
                    </div> 
                    ) :
                    (
                        <div key={i} className=""  >
                            <SalesCard {...sale} />
                            <hr className="mx-4" /> 
                        </div> 
                    )
                )}
                
            </div>}
            {loading && <div className="inline-flex items-center m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" ></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" ></path>
                </svg>
            Loading...</div> }
        </section>
     );
}
 
export default Sales;