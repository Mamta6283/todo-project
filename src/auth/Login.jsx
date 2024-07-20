import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function Login(props) {
    const[formData,setFormData]=useState(null)
    // const[message,setMessage]=useState("")
    // const[data,setData]=useState(1)
    const{message,loginUser,setMessage}=useContext(AuthContext);
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

const submitForm = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });

        if (response.ok) {
            const user = await response.json();
            if (user.length > 0) {
                localStorage.setItem("todoUser", JSON.stringify(user[0]));

                setMessage("successfully logged in");
            } else {
                setMessage("email/password incorrect");
            }
        } else {
            setMessage("something went wrong");
        }
        loginUser(formData); 
        // logout(formData)
    }



    return (
        <form>
       
        <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type="email"  name="email" className='form-control' onChange={handleChange}/>

        </div>

        <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input type="password"  name="password" className='form-control' onChange={handleChange}/>

        </div>
        <button onClick={submitForm} className='btn btn-primary '>Login</button>
        <p>{message}</p>
       </form>
    );
}

export default Login;


// {
//     "users":[],
//     "task":[]
// } json-server --watch db.json --port 5000 ..........***********............*********...........**********............