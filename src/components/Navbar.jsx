import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';  //THIS IS COMPONENT 
import logo from '../assets/logo.png';
import AuthContext from '../auth/AuthContext';


function Navbar(props) {
  //const ac=usecontext(authcontext) when you sending object then you can use destructure


  //here conditional rendering ho rha hai user mein data a rha hai 
  const { user, logout} = useContext(AuthContext);

  //ye sara hum auth mein le gye
  // const[user,setUser]=useState(null) //when  you get this undefined error null error beacuse we trying to print out the null value 
 
  // //when we want to action occur on page loading  
  // // useEffect(()=>{function+-},[depedencies,array]);
  //  useEffect(()=>{
  //        let localUser=JSON.parse(localStorage.getItem("todoUser"));
  //       console.log(localUser)
  //       setUser(localUser)  
  //     },[]); 

      

    return (
        <div>  
            <nav className="navbar navbar-expand-lg bg-dark ">
  <div className="container-fluid ">
    <Link className="navbar-brand text-white " to="/"><img src={logo} alt=''></img>REACTproject</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">    
        {
          !user ?
        
          <>
           <li className="nav-item " >
          <Link className="nav-link active text-white" aria-current="page" to="/" >Home</Link>
        </li>
               
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/">About</Link>
        </li>
        </>
        :
        <>
        

        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/task-list">TaskList</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/create-task">CreateTask</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/profile">Profile</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link text-white" to="#">Link</Link>
        </li>
        <li className="nav-item dropdown ">
          <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {/* this is ternary opertor */}

          {
            // user?<p>welcome {user.name}</p>:""
            user?.name
            
          }
        </Link>
          
        <ul class="dropdown-menu dropdown-menu-end">
            <li><Link class="dropdown-item" to="/profile">profile</Link></li>
            <li><a class="dropdown-item" href="#" onClick={logout}>logout</a></li>
          
          </ul>
           {/* .meaning here is contains this value */}
          
         
        </li>
        </>
}

      </ul>
        
     
    </div>
  </div>
</nav>
        </div>
    );
}

export default Navbar;