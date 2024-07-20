import React, { useContext, useState } from 'react';
import TaskForm from './TaskForm';
import { TasKContext } from '../context/TaskContext';
import { formatDate } from '../helper/Index';

function CreateTask(props) {
    const{recentTask,latestTask}=useContext(TasKContext)
    const[isUpdate,setIsUpdate]=useState(false)
  
  const edit = ()=>{
    setIsUpdate(true)     
  }
                       
    return (
        <div className='container-fluid h-100'>
        <div className='row h-100'>
            <div className='col-lg-6 justify-content-center align-items-center bg-primary h-100 d-flex flex-column'>
                <div className='w-50'>  
                <TaskForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} data={latestTask}> </TaskForm>
                </div>         
                      
            </div>  

            <div className='col-lg-6 justify-content-center align-items-center h-100 d-flex flex-column'>
                <div className='card bg-primary text-white w-75'>
                    <div className='card-body'>
                           {
                            latestTask?
                            <>
                             <div className='d-flex justify-content-between'>
                                <h3>Latest Task</h3>
                                <button className='btn btn-info' onClick={edit} >Edit Tasks</button>
                                
                            </div> 
                            <h4>{latestTask.title}</h4> 
                            
                            <p>{latestTask.description}</p>  

                            <div className='d-flex justify-content-between'>
                                <p className='mb-0 text-warning'>Modifies On:{formatDate(latestTask.modifiedon)}</p>
                                <p className='mb-0 text-warning'>Due Date:{formatDate(latestTask.duedate)}</p>  
                                
                            
                            </div>
                            </>:
                            <p>No Tasks</p>
                           }
                    </div>
                </div>


                <div className='card bg-primary mt-4 text-white w-75'>
                    <div className='card-body'>
                          {
                          recentTask?.map((task)=>(
                            <div className='d-flex justify-content-between border  border-warning p-2'>
                                   <p className='mb-0'>{task.title}</p>
                                    <p className='mb-0'>{task.duedate}</p>
                                </div>
                            ))
                          } 
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CreateTask;

