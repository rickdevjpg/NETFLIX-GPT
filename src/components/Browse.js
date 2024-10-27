import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {



  //fetch data from tmdb api and update the store
  //lets create a new hook for this purpose so our code does not get ugly
  useNowPlayingMovies();



 




  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
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
