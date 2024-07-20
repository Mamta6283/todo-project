import React, { children, createContext, useEffect, useState } from 'react';

export const ProfileContext=createContext();

const ProfileProvider =({children})=>{
    
    const[message,setEmessage]=useState("")
    const [data,setData]=useState({})
    const[latestData,setLatestData]=useState(null)
    const[recentData,setRecentData]=useState(null)
    
    
        
    const submitDetails = async (editData)=>{
           let config={
               method:"POST",
               headers:{
                   "content-type":"application/json"
               },
               body:JSON.stringify(editData)
            }
                try{
                   const response = await fetch(`http://localhost:5000/edit`,config)
                   if(!response.ok){
                         throw new Error("http: error")
                        
                   }
                     const details= await response.json();
                       setData(details)
                   setEmessage("profile is created successfully")
                    getAllData(data)
                }catch(error){
                   console.log(error.message)
                }
            
              }   
              const getAllData= async (id)=>{
                try{
               const response= await fetch(`http:localhost:5000/edit?fuserId=${id}`,{method:"GET"}) 
               if(!response){
                throw new Error("http error") 
                 }  
                }catch(error){
                    console.log(error.message)
                }
             } 
              
              
        const updateProfile =async (editData)=>{
            const config={
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(editData)
            }
            try{
            const response=await fetch(`http://localhost:5000/edit/${editData.id}`,config)
            if(!response){
                throw new Error("http error")
            }
            setEmessage("Profile is Updated successfully")
            getAllData(data)
        }
        catch(error){
            console.log(error.message)
        }
    }
       

    useEffect(()=>{
        if(data){
            getAllData(data.id)
            setData(data)
            
        }
    },[data])
    

   

return(
      <ProfileContext.Provider value={{data,
        submitDetails,
        message,
        updateProfile,
        latestData,
        recentData,
        setData
      }}>
        {children}    
      </ProfileContext.Provider>
    )
}
export default ProfileProvider;