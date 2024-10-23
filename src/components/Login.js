import React, { useState } from 'react'
import Header from './Header'

const Login = () => {


//  using state to change sign in to signup form when clicked on the p below button
    const [isSignInForm,setIsSignInForm]=useState(true);
    const toggleSignInForm=()=>{

        setIsSignInForm(!isSignInForm);
    };




  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_large.jpg 1800w"  alt="im"/>
        </div>
        <form className=' absolute p-12 bg-black w-4/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 '>
            <h1 className='font-bold text-3xl py-4' >
                
                {
                    isSignInForm ? "Sign In": "Sign Up"
                }
                
                </h1>
            

            {!isSignInForm && <input type='text' placeholder='Name' className='p-4 my-4 w-full bg-gray-700'/>}



            <input type='text' placeholder='Email' className='p-4 my-4 w-full bg-gray-700'/>

            <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg '>{
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
