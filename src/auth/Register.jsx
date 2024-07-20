import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function Register(props) {
    const[formData,setFormData]=useState(null)
    // const[message,setMessage]=useState("")
    const {message,registerUser,setMessage}=useContext(AuthContext)
    useEffect(()=>{
        setMessage("")
    },[])
   
     const handleChange=(e)=>{
        let {name,value}=e.target; 
        setFormData((prev)=>({ 

            ...prev,
            [name]:value
        }
    ))
     }

    const submitForm=(e)=>{
        e.preventDefault();
        registerUser(formData);

    }

//database ke sathh connect krne ke liye json use krte hai

                    
//array ,objects   
    return (
       <form>
        <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input type="text"  name="name" className='form-control' onChange={handleChange}/>

        </div>
        <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type="email"  name="email" className='form-control' onChange={handleChange}/>

        </div>

        <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input type="password"  name="password" className='form-control' onChange={handleChange}/>
             
        </div>
        
        <button className='btn btn-primary ' onClick={submitForm}>Register</button>
       <p>{message}</p>

       </form>
    );
}

export default Register;

//three types storage :session storage,cookie and 
//local storage .setitem and get item ,removeitem,clearitem 