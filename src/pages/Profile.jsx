import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import Ellipse  from '../assets/Ellipse.png';
import mamta from '../assets/mamta.png'
import AuthContext from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import { TasKContext } from '../context/TaskContext';
import { ProfileContext } from '../context/ProfileContext';
import { convertBase64 } from '../helper/Index';
import EditUser from './EditUser';

function Profile(props) {
    const {user,formData}=useContext(AuthContext)
   
    const[show,setShow]=useState(false)
    const[imgVal,setImgVal]=useState("")

const edit=()=>{
        setShow(true)
}  

const handleImage = async(e)=>{
    console.log(e)
    let file=e.target.files[0];
    let imgStringValue= await convertBase64(file);
    setImgVal(imgStringValue)

    
}
  
    return (
        <div className='container '>
            <div className='p-4 bg-primary mt-2 text-white align-items-center'>
{/* <input type='file' onChange={handleImage}/> */}
               <div className='d-flex justify-content-around text-white p-2'>

                <div>
                    <img className='img-fluid ' src={imgVal} style={{width:"300px", height:"300px",borderRadius:"300px"}} alt='img'/>
                    <input type='file' onChange={handleImage}/>


            </div>
                     
                 <div> 
                   {
                    user?
                    <>
                    <h3>Login User: {user.name}</h3>
                    <h3>Email: {user.email}</h3> 
                    <h4>Name: {user.name}</h4>
                    <h4>Age: {user.age}</h4>
                    <h4>BirthDate: {user.birthdate}</h4>
                    <h4>City: {user.city}</h4>
   
                    
                   
                    <Link className='btn btn-info p-2' onClick={edit}  >Edit Profile</Link>

                    {/* <Link className='btn btn-info p-2' to="/edit-profile" style={{margin:"4px"}}>Create Profile</Link> */}
                   
                    
                    
                    </>:
                    <h1>No data found</h1>
                   }
                   
                   
                    </div>
                  
                </div>
                           
            </div>
                              <div>
                                  { show &&<EditUser></EditUser>}
                            </div>
        </div>
    );
}

export default Profile;
