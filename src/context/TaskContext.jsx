import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

 export const TasKContext=createContext();


 const TaskProvider =({children})=>{
  const[tmessage,setTmessage]=useState("");
  const [alltask,setAllTask]=useState(null);
  const[recentTask,setRecentTasks]=useState(null);
  const[latestTask,setLatestTasks]=useState(null)



  const{user}=useContext(AuthContext) //beacuse sabse phle ye cheez load hogi phele user login krega and this created in authcontexgt so you can use anywhere

    //save task    
    const saveTask =async (formData)=>{ 
         const config={
          method :"POST",
          headers:{
            "content-type":"application/json" 
          },
          body:JSON.stringify(formData)
         }
         //it will not break the entire page just because of one error it will handle that without disturbing other actions
         try{
          const response = await fetch(`http://localhost:5000/tasks`,config)

          if(!response.ok){
             throw new Error(`!http:error status:${response.status}`)
          }
        
         setTmessage("Task created successfully ")
         getAllTasks(user)

         }catch(error){
              console.log(error.message);
         }
     }


          //get all task 
         const getAllTasks = async (id) =>{
          try{
              const response = await fetch (`http://localhost:5000/tasks?Userid=${id}`,{method:"GET"})
              if(!response.ok){
               throw new Error("http : error") 
              }
                    
              const tasks =await response.json();  
              setAllTask(tasks);
              let recent = tasks.slice(-3);  //to get the last three elements of an array
              setRecentTasks(recent)
                                 
              let latest =tasks[tasks.length-1] //to get the latest array which is add latestly
              setLatestTasks(latest)
          } catch(error){
                            
               console.log(error.message);
          }                
     }                   


     const UpdateTask =async (formData) =>{  
          const config={
               method :"PATCH", //to get the information bcz we already have this information
               headers:{
                 "content-type":"application/json"     
               },
               body:JSON.stringify(formData)
              }
              try {
                  const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
                  if(!response.ok){
                    throw new Error(`!http:error status:${response.status}`)
                 }
                 setTmessage("Task updated successfully")
                 getAllTasks(user.id)
              }catch(error){
                       console.error(error);
              }
     }


     const deleteTask =async (formData) =>{
          const config={
               method :"DELETE", //to get the information bcz we already have this information
              
              }
              try {
                  const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
                  if(!response.ok){
                    throw new Error(`!http:error status:${response.status}`)
                 }
                 
                 setTmessage("Task Deleted successfully")
                 getAllTasks(user.id)
              }catch(error){
                       console.error(error);
              }
     }

    

      
      //useeffect only runs one time if no dependencies added
    useEffect(()=>{  
     if(user){
          getAllTasks(user.id);
     }
       
    },[user]) // three ways to changing here you can add dependencies when you want todo something if not and you want to run one time 

              
    return(
                //this is used to provide data to components in children it will show everything 
                <TasKContext.Provider value={{
                   saveTask,
                   tmessage,
                   alltask,
                   recentTask,
                   latestTask,
                   UpdateTask,
                   deleteTask
                  //  submitEditData,
                  //  editData,
                  //  message,
                  //  setEmessage,
                  //  setEditData

               
                       
                }}>
                     {children}
                </TasKContext.Provider>
              )
 }
 export default TaskProvider;

//JSON :this main part of js (java-script)
//json this is main part of fetch it will convert the data which is coming from server fetch promise ko solve krke response dalte hai 