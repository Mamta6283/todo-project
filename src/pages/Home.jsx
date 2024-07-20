import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import illustration from '../assets/illustration.png';

function Home(props) {
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-lg-6 justify-content-center align-items-center bg-primary h-100 d-flex flex-column">
            <h1 className='display-5 text-center text-white text-uppercase '>An App to<br></br>
            make your life<br></br>
          
            <span className='display-2'>easy</span></h1>

            <img className='img-fluid mt-5 ' src={illustration}></img>
          </div>


          <div className="col-lg-6 justify-content-center align-items-center h-100 d-flex flex-column">
            <div className='card w-50'> 
                <div className='card-header d-flex rounded-0 ' >
                    <Link to="/login" className='py-3 px-5 w-50 text-decoration-none login  '>Login</Link>
                    <Link to="/register" className='py-3 px-5 w-50 text-decoration-none register'>Register</Link>
                </div>
                <div className='card-body'>
                    
                    {/* it will render a child route */}
                    <Outlet></Outlet> 
                </div>

            </div>

          </div>
        </div>
      </div>
    );
}

export default Home;