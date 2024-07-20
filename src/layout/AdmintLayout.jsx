import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdmintLayout(props) {
    return (
        <div className='container'>
             <div className='row h-100'>
                    <div className="col-lg-9 bg-primary h-700">
                        
                    <Link to="/admin/dashboard">Dashboard</Link>
                    </div>
                    <div className='col-lg-9 bg-secondary h-700'>
                      <Outlet/>
             </div>
             </div>
             
        </div>
    );
}

export default AdmintLayout;