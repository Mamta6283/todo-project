import React, { useContext, useRef } from 'react';
import { formatDate } from '../helper/Index';
import TaskForm from '../pages/TaskForm';
import { TasKContext } from '../context/TaskContext';

function PopUp(props) {
//  let type="view";
const{task}=props;
const {type,data}=task;
const {deleteTask ,tmessage}=useContext(TasKContext);
const closeBtn=useRef(null);//this is used for manipulating the dom 
// console.log(closeBtn.current.type)
// console.log(closeBtn)
const handleDelete = (data) => {
  deleteTask(data);
  setTimeout(() => {
      if (closeBtn.current) {
          closeBtn.current.click();
      }
  }, 100); // 3000 milliseconds = 3 seconds
};

    return (
        <div className="modal" tabindex="-1" id='task-modal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              { type === "view"? <h5 className="modal-title">View</h5>:type === "edit"?<h5>Edit</h5> :<h5>Delete</h5>
              }
              <button  ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body bg-dark text-white">
                {
                    type === "view" ?
                    <div className='p-2'>
                    
                      <h3>{data?.title}</h3>
                      <p>{data?.description}</p>
                      <div className='d-flex justify-content-between bg-primary'>
                        <p className='mb-0'>Modified On:{formatDate(data ?.modifiedon)}</p>
                        <p className='mb-0'>Due Date:{formatDate(data ?.duedate)}</p>
                         </div>
                    </div>

                      : type === "edit" ?
                      <div>
                        <TaskForm isUpdate={true} data={data} closeBtn={closeBtn} isPopup={true}></TaskForm>
                      </div>

                      :
                      <div className='p-2'>
                      <p>Are you sure ?..you want to delete ?</p>
                      <div className='d-flex'>
                        <button className='btn btn-danger ms-auto'onClick={()=>{handleDelete(data)} } >Yes</button>  
                        <button className='btn btn-warning ms-2' data-bs-dismiss="modal">No</button>

                      </div>
                      </div>
                      

                }
                </div>
            

            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
    );
}

export default PopUp;