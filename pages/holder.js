import Image from 'next/image';
import {FaTelegramPlane , FaDiscord , FaTwitter , FaGithub} from 'react-icons/fa';
import Stepper from '../components/Stepper';

const HolderSection = () => {
    function myImageLoader({ src, width, quality }) {
        if(width<=700) return `http://localhost:3000/_next/image?url=%2Fbannersm.jpeg&w=${width}&q=${quality || 75}`;
        console.log("lg");
        return `http://localhost:3000/_next/image?url=%2Fbannerlg.jpeg&w=${width}&q=${quality || 75}`;


      }
    return ( 
        <section className="">
            <div className="mb-8" aria-label='banner'>
                <a href="https://i.ibb.co/0Q71zXG/Untitled-design-6.png" target="_blank" rel="noreferrer" className="relative block w-[95vw] sm:w-[75vw] h-[90px] mx-auto shadow-md shadow-violet">
                    <Image src="/bannerlg.jpeg" alt='banner' 
                        scrSet=" /bannersm.jpeg 500w,
                            /bannerlg.jpeg 1200w"  fill  sizes="(max-width: 768px) 95vw,
                            (max-width: 1200px) 75vw,
                            60vw"/>
                </a>
            </div>
            <Stepper />


        </section>
     );
}
 
export default HolderSection;