import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import SalesCard from "../components/Cards/SalesCard";
import Top5 from "../components/Top5";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import TopSale from "../components/Cards/TopSale";
import SalesCardGrid from "../components/Cards/SalesCardGrid";

const GridView = ({list, lastElemet, query, chain}) => (
    list && <div class="w-full px-5 py-2 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6">
         <TopSale query={query} chain={chain} />
         {list?.map((sale,i) => 
            ( list.length === i+1 ) ? 
            ( 
            <div key={i} className="" ref={lastElemet} >
                <SalesCardGrid {...sale} />
                
            </div> 
            ) :
            (
                <div key={i} className=""  >
                    <SalesCardGrid {...sale} />
                </div> 
            )
        )}     
    </div>
)

const ListView = ({list, lastElemet}) => (
    list && <div className="rounded-2xl bg-noir my-2">
             
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
        
    </div>
)

const Sales = () => {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const router = useRouter();
    // for the top5 sales collections and the top sale
    const [queryDay,setDayQuery] = useState(7)
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
      const [ isGrid, setGrid ] = useState(true);

    //   for the search bar expension
    const [isExpanded, setIsExpanded] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    // Focus the input when it becomes visible
    if (!isExpanded) {
        searchInputRef.current.focus();
      }
  };

    // border-b-2 last:border-b-0
    return ( 
        <section className="h-full w-full px-7 md:px-[10%] " aria-label="tracking sales transactions">
            <Top5 query={queryDay} setQuery={setDayQuery} />
            
            
            <div className="flex justify-between items-end md:items-center mb-5">
                <div className="flex flex-col-reverse md:flex-row gap-1 md:gap-3">
                    <h1 className="capitalize font-mono font-semibold text-2xl ">sales feed</h1>
                    {/* here the user can select the card's type(grid/list)  */}
                    <div className="inline-flex" aria-label="grid/list buttons">
                        <button className={`p-1.5 rounded-l border-noir ${isGrid ? "bg-violet" : "bg-noir hover:bg-noir/40"}`} onClick={()=>setGrid(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>
                        </button>
                        <button className={`p-1.5 rounded-r border-noir ${isGrid===false ? "bg-violet" : "bg-noir hover:bg-noir/40"}`} onClick={()=>setGrid(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* className="max-w-[10rem] sm:max-w-sm w-full flex items-center rounded-xl border-[1px]  focus:shadow focus:outline-none focus-visible:border-violet h-12  p-1 cursor-text " */}
                <div  aria-label="search by name" className={ ` max-w-[40%]  flex items-center ${isExpanded && "border-b"} border-[#aaa] focus:shadow focus:outline-none h-10  cursor-text` }
 >
                    <button className="" onClick={toggleSearch} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                    <div ref={searchInputRef} className={`${ isExpanded ? "visible" : "hidden"} inline-flex w-full`}>
                        <input type="text" placeholder="Collection Name" name="query"   onChange={handleChange} 
                            className="px-1 bg-transparent outline-none w-full "
                            />
                        {query.length>0 && (<button className="" onClick={()=>setQuery('')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>)}
                    </div>
                </div>
            </div>
            {
                isGrid ?
                <GridView query={queryDay} chain={router.query.chain} list={list} lastElemet={lastElemet}/> :
                <ListView list={list} lastElemet={lastElemet}/>
                
            }

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