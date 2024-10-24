import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';

const Login = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();



//  using state to change sign in to signup form when clicked on the p below button
    const [isSignInForm,setIsSignInForm]=useState(true);

//to store error messages while form validation
const [errorMessage,setErrorMessage]=useState(null);




    const toggleSignInForm=()=>{

        setIsSignInForm(!isSignInForm);
    };

    const name=useRef(null);
    const email=useRef(null);
    const password=useRef(null);



    //signing in or signing up the user
    const handleButtonClick=()=>{
        //validate the form data
        
       const message= checkValidData(email.current.value,password.current.value);
       setErrorMessage(message);

       //if there is a message it is not valid
       if(message) 
      return;


//after validadting,now we can do sign up and sign in..what we wish to
//signIn SignUp logic
if(!isSignInForm) //it is signUp form
{


    //signUp logic
   createUserWithEmailAndPassword(
    auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
      }).then(() => {
        // Profile updated!
        if (user) {
            // User is signed in, see docs for a list of available properties
            
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch( addUser({
              uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL
            }) )


            

          } else {
            // User is signed out
            dispatch(removeUser());
            
          }
        navigate("/browse")
        
      }).catch((error) => {
        // An error occurred
        // ...
        setErrorMessage(error.message);
      });
    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage);

    
  });



}
else //it is signIn form
{
//signIn logic


signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage);
  });





}



       

       



    }




  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_small.jpg" srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_large.jpg 1800w"  alt="im"/>
        </div>
        <form className=' absolute p-12 bg-black w-4/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 ' onSubmit={(e)=>e.preventDefault()} >
            <h1 className='font-bold text-3xl py-4' >
                
                {
                    isSignInForm ? "Sign In": "Sign Up"
                }
                
                </h1>
            

            {!isSignInForm && <input ref={name} type='text' placeholder='Name' className='p-4 my-4 w-full bg-gray-700'/>}



            <input
            ref={email}
            type='text' placeholder='Email' className='p-4 my-4 w-full bg-gray-700'/>

            <input
            ref={password}
            type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>

            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>


            <button className='p-4 my-6 bg-red-700 w-full rounded-lg ' onClick={handleButtonClick} >{
                    isSignInForm ? "Sign In": "Sign Up"
                }</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{

                isSignInForm?"New to Netflix? Sign Up Now":"Already Registered? Sign In Now"

 
              }
            </p>
        </form>
      
    </div>
  )
}

export default Login
