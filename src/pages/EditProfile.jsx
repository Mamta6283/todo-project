import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { TasKContext } from '../context/TaskContext';
import { ProfileContext } from '../context/ProfileContext';

function EditProfile(props) {
    const init={
        name:"",
        age:"",
        birthdate:"",
        city:""
     }
     const[editData,setEditData]=useState(init)
     const{user}=useContext(AuthContext)
     const{submitDetails,message}=useContext(ProfileContext);
     const{data}=useContext(ProfileContext) 
     const{updateProfile}=useContext(ProfileContext)  
     const {show,setShow}=props
   
     
    const handleChange = (e) =>{
        let {name,value}=e.target;
        setEditData((prev)=>({
                ...prev,
                [name]:value,
                userId:user.id
        }))
    }
    const submitdata=(e)=>{
             e.preventDefault();
             submitDetails(editData)
            //  setEditData((prev)=>({...prev,editData}))
    }

    const cancel =()=>{
        setEditData(init)
        setShow(false)
    }
    useEffect(()=>{
        updateProfile(user)
    },[user])


    return (
        <form onSubmit={submitdata}>
       
        <div className='conatainer bg-body-secondary'>
    <div className='p-4 bg-primary mt-2 text-white' style={{margin:" 400px 400px"}}>

         <div className='mb-3'>
            <label className='form-label'>First-Name</label>
            <input type="text"  name="name" className='form-control' value={editData.name}  onChange={handleChange} />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Age</label>  
            <input type="text"  name="age" className='form-control'  value={editData.age} onChange={handleChange}/>
        </div>

        <div className='mb-3'>
            <label className='form-label'>Birth-date</label>
            <input type="date"  name="birthdate" className='form-control' value={editData.birthdate} onChange={handleChange}/>
        </div>  

        <div className='mb-3'>
            <label className='form-label'>City</label>
            <input type="text"  name="city" className='form-control' value={editData.city} onChange={handleChange} />
        </div>
        {
            show?
            <>
             <button className='btn btn-info' onClick={()=>{updateProfile(user)}}>Update Profile</button>
             <button className='btn btn-info' onClick={cancel} style={{margin:"12px"}}>cancel</button>
             </>:
             <button className='btn btn-info' onClick={()=>{submitDetails(editData)}}>Create Profile</button>
            }
       
      <p>{message}</p>
       
        </div>
    
    </div>
            

       </form>
    
    );
}

export default EditProfile;