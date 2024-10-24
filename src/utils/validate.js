
export const checkValidData=(email,password)=>{

const isEmailValid= /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);

const isPasswordValid= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);


// if(name===null)
//     return;

// const isNameValid=/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

 

// if(name===null)
//     return;

// if(!isNameValid)
//      return "Name not valid";


if(!isEmailValid)
    return "Email Id is not valid";

if(!isPasswordValid)
    return "Password is not valid";

return null;


}