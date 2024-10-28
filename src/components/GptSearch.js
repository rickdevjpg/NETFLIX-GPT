import React from 'react'
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL_SRC, BG_URL_SRCSET } from '../utils/constants';



const GptSearch = () => {
  return (
    <div>
         <div className='absolute -z-10'>
            <img src={BG_URL_SRC} 
            srcSet={BG_URL_SRCSET}  alt="im"/>
        </div>

<GptSearchBar/>
<GptMovieSuggestions/>

        
      
    </div>
  )
}

export default GptSearch
