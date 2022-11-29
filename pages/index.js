import Head from 'next/head'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Apello</title>
        <link rel="icon" type="image/svg+xml" href="/apello-04.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="container px-[2%] mt-[10%] md:mt-4  mx-auto">
          <div className="flex flex-wrap items-center relative mx-auto">
              
              <div className="w-full md:w-1/2 py-[5%] lg:px-[5%]    content-center ">
                  <h2 className="mb-3 sm:mb-6 text-4xl sm:text-5xl  tracking-wide  font-bold uppercase  drop-shadow-text-sm lg:drop-shadow-text-lg selection:bg-bleu selection:text-[#171819]" > Let&apos;s build bridges not walls</h2>
                  <p className="text-[#e5e5e5] font-jura text-lg ">Take your DAO to the next level with APELLO!</p>
                  
                  <input type="button" value='Add to Server' className="bg-black rounded text-base font-medium uppercase tracking-wide text-center text-white px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc  my-9 shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-500 hover:shadow-[inset_144.4px_0_0_rgba(108,99,255,0.99)] border-solid border-violet border-2" />

                  {/*<div className="flex justify-evenly ">
                      <input type="button" value={'Add to server'} className="bg-bleu rounded-md text-base font-medium uppercase tracking-wide text-center text-noir px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc hover:bg-orange/90 " />
                      <input type="button" value={'Add to app'} className="bg-bleu rounded-md text-base font-medium uppercase tracking-wide text-center text-noir px-2 py-3  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc hover:bg-orange/90 " />

                  </div>*/
                  }
              </div>

              <div className="w-full md:w-1/2 lg:px-[5%] relative">
                  <Image src="/apello-01.png" alt='Home image' className='!h-full' width={600}  height={600} />
              </div>

          </div>

      </section>
      <Footer />
    </>
  )
}
