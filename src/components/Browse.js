import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);




  //fetch data from tmdb api and update the store
  //lets create a new hook for this purpose so our code does not get ugly
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();



 




  return (
    <div>
      <Header/>
      {

        showGptSearch?<GptSearch/>:<>
        <MainContainer/>
        <SecondaryContainer/></>
      }
      
      
      
      {
        /*
          Main Container
            -VideoBackground
            -VideoTitle
          SecondaryContainer
            -MoviesList*n
            --cards*n
          
          
         */
      }
      
    </div>
  )
}

export default Browse
