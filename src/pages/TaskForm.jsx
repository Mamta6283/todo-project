import React, { useContext, useEffect, useState } from 'react';
import { TasKContext } from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {

     const init={
        title :"",
        description: "",
        duedate: ""
     }

    let {isUpdate ,setIsUpdate ,data ,closeBtn,isPopup}=props
    const[formData,setFormData]=useState(init)
   const{saveTask ,tmessage,UpdateTask}=useContext(TasKContext)
   const{user}=useContext(AuthContext)
// console.log(formData)

   useEffect(()=>{
         if(data && isUpdate){
            setFormData(data)  
         }
   },[data ,isUpdate])

    const handleChange=(e)=>{
       
        let{name,value}=e.target
        setFormData((prev)=>({
                   ...prev,
                   [name]:value,
                   Userid:user.id,
                   modifiedon:Date()
        }))
       
    }         
      // const addTask=()=>{
      //     saveTask(formData)
      // }
    const cancel = ()=>{
        if(isPopup)
        {
     closeBtn.current.click();
        }
        else{
     setIsUpdate(false); 
        }
     setFormData(init);



    }               
     
    return (
        <div>
            <div className='p-2'>
            <h3 className=' text-white text-center'> {isUpdate ?"Update Task":"Create Task"}</h3>
            <div className='card'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type="text" name='title' className='form-control' onChange={handleChange} value={formData.title} />
                    
                    </div>  
                       
                    <div className='mb-3'>
                        <label className='form-label'>Due Date</label>
                        <input type="datetime-local" name='duedate' className='form-control' onChange={handleChange} value={formData.duedate}/>
                    
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                       <textarea className='form-control' name='description' rows="10" onChange={handleChange} value={formData.description}></textarea>
                    </div>
                    <p>{tmessage}</p>
                    <div>
                       { isUpdate ?
                       <>
                       <button className='btn btn-primary me-3' onClick={()=>{ UpdateTask(formData) }}>Update Task</button>
                       <button className='btn btn-danger' onClick={cancel}>Cancel</button>
                       </>:
                      < button className='btn btn-primary ' onClick={()=>{ saveTask(formData) }}>CreateTask</button>
                       }



                                
                        {/* {isUpdate ? "Update task":"Create task"} */}
                    </div>
                </div>
            </div>
        </div>
            
        </div>
    );
}

export default TaskForm;




