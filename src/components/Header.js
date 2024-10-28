import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const dispatch=useDispatch();
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)
 
  const handleSignOut=()=>{
    signOut(auth).then(() => {
   //navigate to home pagw
     
    }).catch((error) => {
      // An error happened.
      navigate("/error");

    });
  }
  useEffect(()=>{

    const unsubsribe=onAuthStateChanged (auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          
          const {uid,email,displayName,photoURL} = user;
          dispatch( addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL
          }) );
          
navigate("/browse")

          

        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
          
        }
      });


//unsubscribe when component unmounts
      return ()=> unsubsribe();

},[]);

const handleGptSearchClick=()=>{
  // toggle GPT Search
  dispatch(toggleGptSearchView());
}

const handleLanguageChange=(e)=>{
  dispatch(changeLanguage(e.target.value));

  

}


  return (
    <div className=" z-10 absolute px-8 py-2 bg-gradient-to-b from-black w-screen flex justify-between "  >
        <img
        className='w-44'
        src={LOGO} alt='logo'/>
      { user && <div className='flex p-2'>
        {showGptSearch&&<select className='p-2 m-2 rounded-lg bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=>
            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          )}
        </select>
}
        <button className='py-2 px-4 mx-4  bg-purple-800 my-2 text-white rounded-lg'
        onClick={handleGptSearchClick}
        >{showGptSearch?"Home Page":"GPT Search" }</button>
        <img className='w-12 h-12 ' alt='usericon' src={user?.photoURL}/>
        <button className='font-bold text-white'
        onClick={handleSignOut}
        >Sign Out</button>
      </div>}
    </div>
  )
}

export default Header
