import { useEffect, useRef } from "react";
import { useState } from "react";
import CollectionCard from "../../components/Cards/CollectionCard";

const RaritySection = () => {

    const [collectionList, setCollectionList] = useState(null) ;
    //number of pages
    const [nbPages, setNbPages] = useState(0)

    //page number 
    const [pageNumber, setPageNumber] = useState(0);
    //a little trick to set up an array of page numbers to map
    const pages = new Array(nbPages).fill(null).map((v,i)=>i);
    //get the collections from the backend
    useEffect(() => {
      const fetchCollections = async ()=> {
        const response = await fetch(`https://apello-api.xyz:4000/api/collectionsInfo?page=${pageNumber}`);
        const {total, collections} = await response.json();

        if(response.ok){
          setCollectionList(collections);
          setNbPages(total)
          console.log(collections)
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }

      }
      fetchCollections();
      
    }, [pageNumber]);

    //pagination next previous button
    const gotoPrevious = ()=>{
      setPageNumber(Math.max(0,pageNumber - 1));
    }
    const gotoNext = ()=>{
      setPageNumber(Math.min(nbPages - 1,pageNumber + 1));
    }
    

    //filter by name
    const [name, setName] = useState('');

    //filter by blockchain
    const [blockchain, setBlockchain] = useState('All Chains');

    const selectChain = (e)=>{
      console.log(e.target.props)
    }

    //reference the div to be hidden when clicking outside
    const ref = useRef(null);
    //show the select dropdown
    const [show,setShow] = useState(false);
    //click outside
    useEffect(() => {
      const handleClickOutside = (event)=>{
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
          }
      }
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [show]);

    return ( 
        <section className=" m-10  ">
          <div className=" flex flex-col sm:flex-row gap-x-2 gap-y-2 justify-between mx-10 font-jura" aria-label="search fields ">
            <div  aria-label="search by name" className="max-w-md w-full flex items-center rounded-xl border-[1px]  focus:shadow focus:outline-none focus-visible:border-violet h-12  p-1 cursor-text ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input type="text" placeholder="Collection Name" 
                className="bg-transparent outline-none  w-full "
                onChange={(e) => setName(e.target.value)} value={name} />
              {name.length>0 && (<button className="" onClick={()=>setName('')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>)}
            </div>

            <div className="relative ml-auto w-full sm:w-auto" aria-label="select blockchain filter">
              <button className={`flex justify-between items-center relative p-3 min-w-[150px] w-full sm:w-auto rounded-xl border-[1px] ${show && 'border-violet'} `} onClick={()=>setShow(!show)} >
                <span className="">All Chains</span>
                <svg className="absolute top-[calc(50% - 0.5em)] right-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="10" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path d="M215.4 92.9A8 8 0 00208 88H48a8 8 0 00-7.4 4.9 8.4 8.4 0 001.7 8.8l80 80a8.2 8.2 0 0011.4 0l80-80a8.4 8.4 0 001.7-8.8z"></path></svg>
              </button>
              {show && <div ref={ref} className="absolute top-full z-50 min-w-[150px] w-full sm:w-auto bg-noir opacity-100 outline-none rounded-lg border-[1px] border-noir">
                <ul className="py-2" onClick={selectChain} >
                  <li  className="py-2 px-6 hover:bg-[#212529] cursor-pointer select-none" value="All Chains" >All Chains</li>
                  <hr  className="my-2" />
                  <li  className="py-4 px-6 hover:bg-[#212529] cursor-pointer select-none" value="Terra">Terra</li>
                  <li className="py-4 px-6 hover:bg-[#212529] cursor-pointer select-none" value="Stargaze">Stargaze</li>
                  <li className="py-4 px-6 hover:bg-[#212529] cursor-pointer select-none" value="Juno">Juno</li>
                </ul>
              </div>}
            </div>
          </div>

          <div className="ml-[-16px] flex flex-wrap flex-row p-10  gap-y-3">
              {collectionList && collectionList.filter((collection) => {
                //console.log(blockchain)
                return name.toLowerCase() === ''
                        ? collection 
                        : collection.name.toLowerCase().includes(name);
              }).map((collection,i)=>(
                  <CollectionCard key={i} collectionInfo={collection}  />
              ) )}
          </div>
            <div className="mb-16 flex justify-center gap-x-1">
              {pages.map((pageIndex)=> (
                <button key={pageIndex} className="p-1 text-violet" onClick={()=>setPageNumber(pageIndex)}>{pageIndex + 1}</button>
              ))}
            </div>
        </section>
     );
}
 
export default RaritySection;