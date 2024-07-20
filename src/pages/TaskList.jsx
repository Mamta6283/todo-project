import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { TasKContext } from '../context/TaskContext';
import { formatDate } from '../helper/Index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import PopUp from '../components/PopUp';

//reducer function
const reducer=(state,action)=>{
    switch (action.type){  //whenever you want to send the multiple data then you have to use array or object
        case "VIEW": return {type:"view" ,data: action.payload}
        case "EDIT" :return {type:"edit",data: action.payload}
        case "DELETE":return {type:"delete" ,data: action.payload}
    }

}
function TaskList(props) {
    const init ={type : null ,data : null}
    const[state,dispatch]=useReducer(reducer,init)
const{alltask}=useContext(TasKContext)
const [filterTask , setFilterTask]=useState(null);


useEffect(()=>{
    if(alltask){
        setFilterTask(alltask)
    }
},[alltask])

const haandleSearch =(e)=>{
      let {value}=e.target
      const filteredValue=alltask.filter((task)=>
    task.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterTask(filteredValue)  

}

//sorting method sorted on id array,sort and reverse ...numerical sort then you will use numerical sort a-b descriptionn datawise sorting admin module role="user" admin layout different 
    return (
        <div className='container  '>
        
            <div className='p-4 bg-primary mt-2'>
                <div className='d-flex justify-content-between  text-white p-2'>
                    <h3 className='mb-0'>Task List</h3>
                    <Link className='btn btn-info ' to="/create-task"> Create-Task</Link>
                </div>
                <div className='py-2'>
                          <input type='text' className='form-control' placeholder='Search Task' onChange={haandleSearch}/>
                </div>
                
                <div className='p-2'>
                      <div className='row text-white bg-dark rounded-1 py-2' >
                            <div className='col-lg-1'>Sr.No</div>
                            <div className='col-lg-2'>Title</div>
                            <div className='col-lg-5'>Description</div>
                            <div className='col-lg-2'>DueDate</div>
                            <div className='col-lg-2'>Actions</div>
                           
                      </div>
                      {
                        filterTask?.map((task)=>(
                            <div key={task.id} className='row text-white bg-dark border rounded-1 py-3 mt-2' >
                            <div className='col-lg-1'>{task.id}</div>
                            <div className='col-lg-2'>{task.title}</div>
                            <div className='col-lg-5'>{task.description}</div>
                            <div className='col-lg-2'>{formatDate(task.duedate)}</div>
                            <div className='col-lg-2'>
                                <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"VIEW",payload:task})}}>
                                    <FontAwesomeIcon icon={faEye} />
                                </span>
                                <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"EDIT",payload :task})}}>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </span>

                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"DELETE",payload:task})}}>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </span>
                            </div>
                      </div> 
                        ))
                      }
                </div>
            </div>
            <PopUp task={state}></PopUp>
        </div>
    );
}

export default TaskList;