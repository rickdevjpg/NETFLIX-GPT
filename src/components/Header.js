import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const dispatch=useDispatch();
 
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


  return (
    <div className=" z-10 absolute px-8 py-2 bg-gradient-to-b from-black w-screen flex justify-between "  >
        <img
        className='w-44'
        src={LOGO} alt='logo'/>
      { user && <div className='flex p-2'>
        <img className='w-12 h-12 ' alt='usericon' src={user?.photoURL}/>
        <button className='font-bold text-white'
        onClick={handleSignOut}
        >Sign Out</button>
      </div>}
    </div>
  )
}

export default Header
