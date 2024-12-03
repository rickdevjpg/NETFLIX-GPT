import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

//fetching the trailer and updating the store

const useMovieTrailer=(movieId)=>{
 
    const dispatch=useDispatch();

    const trailerVideo=useSelector(store=>store.movies.trailerVideo);


    
//fetch trailer
const getMovieVideos=async()=>{


const data=await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US", API_OPTIONS);
const json=await data.json();


const filterData=json.results.filter(video=>video.type==="Trailer");
const trailer=filterData!==null?filterData[0]:json.results[0];

dispatch(addTrailerVideo(trailer));

 

}

useEffect(()=>{
    if(!trailerVideo)
getMovieVideos();
},[]);

    

    
}

export default useMovieTrailer;