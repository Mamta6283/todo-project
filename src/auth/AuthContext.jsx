import { children, createContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
      const[user,setUser]=useState();
      const[message,setMessage]=useState("")
      const navigate = useNavigate(); // to redirect via function

    // //check user logged in state on  page load.
    // useEffect(()=>{
    //     let localUser=JSON.parse(localStorage.getItem("todoUser")); //here parse converting into object stringfy converting data into strings
    //     setUser(localUser); 

    // },[])  

    const checkUserStatus = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {  
            const userData = await response.json();
            if (userData.length > 0) {
                setUser(userData[0]);  
            } else {
                console.log("user doesn't exist")
                setUser(null);   
                localStorage.removeItem("todoUser");
            }
        } else {
            console.log("something went wrong");
        }
    }

    //check user logged in state on page load.
    useEffect(() => {
        let localUser = JSON.parse(localStorage.getItem("todoUser"));
        setUser(localUser);
        if (localUser) {
            checkUserStatus(localUser.email);
        }
    }, []);



    // //Register user
    const registerUser = async (formData) => {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`, { method: "GET" });
        if (checkUser.ok) {
            const user = await checkUser.json();
            if (user.length > 0) {
                setMessage("user already exists");
            } else {
                const response = await fetch("http://localhost:5000/users", config);
                if (response.status === 201) {
                    const user = await response.json();
                    localStorage.setItem("todoUser", JSON.stringify(user));
                    // setMessage("Registered Successfully")
                    setUser(user);
                    setMessage("Registered Successfully");
                    navigate("/task-list");
                    setTimeout(() => {
                        navigate("/task-list");
                    }, 3000)
                } else {
                    console.log("something went wrong");
                }
            }                   
        } else {  
            setMessage("something went wrong, please try again");
        }
    }
    const loginUser = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });

        if (response.ok) {
            const user = await response.json();
            if (user.length > 0) {
                localStorage.setItem("todoUser", JSON.stringify(user[0]));
                setUser(user[0]);
                setMessage("successfully logged in");
                navigate("/task-list");
            } else {
                setMessage("email/password incorrect");
            }
        } else {                                   
              setMessage("something went wrong");
        }
    }

   
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("todoUser");
        setUser(null)
        navigate("/login")
    }

    const UpdateUser =async (formData) =>{  
        const config={
             method :"PATCH", //to get the information bcz we already have this information
             headers:{
               "content-type":"application/json"     
             },
             body:JSON.stringify(formData)
            }
            try {
                const response = await fetch(`http://localhost:5000/users/${formData.id}`,config)
                if(!response.ok){
                  throw new Error(`!http:error status:${response.status}`)
               }
                 
               setMessage("user updated successfully")
                const updatedUser = await response.json();
               setUser(updatedUser); 

                 
            }catch(error){
                     console.error(error);
            }
   }

     
    return(
        <AuthContext.Provider value={{user 
        ,message
        ,registerUser 
        ,logout      
        ,loginUser,            
        setMessage,     
        UpdateUser,
        setUser
        }}>
            {children} 
        </AuthContext.Provider>
    )   
} 

export default AuthContext;   