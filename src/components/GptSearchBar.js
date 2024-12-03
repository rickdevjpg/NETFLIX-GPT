import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'

import model from '../utils/geminiAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const dispatch=useDispatch();

    const langKey=useSelector(store=>store.config.lang);
    const searchText=useRef(null);

    //search movie in tmdb
    const searchMovieTMDB=async(movie)=>{

        const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);

        const json=await data.json();
        
        

        return json.results;


    }

    //handle gpt api call and stuff
    const handleGptSearchClick=async ()=>{
       // console.log(searchText.current.value);

       const geminiQuery= "Act as a Movie Recommendation system and suggest some movies for the query "+
       searchText.current.value+
       ". Only give me names of 5 movies , comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya ";

       //make an api call to gpt api and get movie results
    const result=await model.generateContent(geminiQuery);
    if(result===null)
        return;
    //console.log(result?.response?.text());
    const geminiMovies=result?.response?.text().split(",");
   // console.log(geminiMovies);

   //for each movie i will search tmdb api
   const promiseArray=geminiMovies.map(movie=>searchMovieTMDB(movie));
  //this will return 5 promises as map function will not wait for fetch to resolve


const tmdbResults=await Promise.all(promiseArray);
//console.log(tmdbResults);

dispatch(addGptMovieResult({movieNames: geminiMovies,movieResults:tmdbResults}));




   
    

        



    }

  return (
    <div className=' pt-[35%] md:pt-[10%] flex justify-center '>
      <form className=' w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={
        (e)=>e.preventDefault()
      }>
        <input
        ref={searchText}
        type='text' className=' p-4 m-4 col-span-9  rounded-lg  ' placeholder={lang[langKey].gptSearchPlaceHolder}/>
        <button className=' m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3'
        onClick={handleGptSearchClick}
        >{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
 