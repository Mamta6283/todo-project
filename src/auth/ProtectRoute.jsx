import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//this component will protect the routee if this is applied on your project then user cannot directly acess these links 

function ProtectRoute({children}) { 

    const[isLoggedIn,setIsLoggedIn]=useState(false)
    const navigate=useNavigate();
    const checkUserStatus = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const userData = await response.json();
            if (userData.length > 0) {
                setIsLoggedIn(true);
            } else {
                // console.log("user doesn't exist")
                setIsLoggedIn(false);
                localStorage.removeItem("todoUser"); 
                navigate("/login")
            }
        } else {
            console.log("something went wrong");
        }
    }  

    //check user logged in state on page load.
    useEffect(() => {
        
       let localUser=JSON.parse(localStorage.getItem("todoUser"))  
    
    if(localUser){
        checkUserStatus(localUser.email);
      setIsLoggedIn(false)
      navigate("/login")
    }
    }, []);
   


    return (
      isLoggedIn ? children : null
    );
}

export default ProtectRoute;