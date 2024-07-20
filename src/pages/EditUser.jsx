import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';

function EditUser(props) {
    const init={
        name:"",
        age:"",
        birthdate:"",
        city:""
     }
     const[editData,setEditData]=useState(init)
     const { UpdateUser,message,formData ,user ,setUser }=useContext(AuthContext)
     console.log(user) 
     console.log(setUser)
     const handleChange = (e) =>{
        let {name,value}=e.target;
        setEditData((prev)=>({
                ...prev,
                [name]:value,
                userId:user.id
        }))
    }

    useEffect(()=>{
        if(user){
            UpdateUser(user)
        }
    },[user])
    return (
        <form>
       
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
       <button className='btn btn-info' onClick={()=>{UpdateUser(user)}}>Update Profile</button>
    <p>{message}</p>
       
        </div>
    
    </div>
            

       </form>
    
    );
}

export default EditUser;