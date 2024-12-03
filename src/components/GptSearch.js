import React from 'react'
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL_SRC, BG_URL_SRCSET } from '../utils/constants';



const GptSearch = () => {
  return (
    <>
     <div className='fixed -z-10'>
            <img 
            className='h-screen w-screen object-cover'
            src={BG_URL_SRC} 
            srcSet={BG_URL_SRCSET}  alt="im"/>
        </div>
    <div className=''>
        

<GptSearchBar/>
<GptMovieSuggestions/>

        
      
    </div>
    </>
  )
}

export default GptSearch
