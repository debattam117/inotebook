import React , { useContext } from "react";
import noteContext from '../Context/notes/noteContext';

const Noteitem = (props) => {

    const{note,updateNote}=props;
    const context= useContext(noteContext);
    const{deletNote}=context;

  return (
    <div className='col-md-3'>
      
       <div className="card my-3" >
  
        <div className="card-body">
         <h5 className="card-title">{note.title}</h5>
         <p className="card-text">{note.description}</p>
         <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletNote(note._id)}}></i>
         <i className="fa-solid fa-pen mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>

      </div>
    </div>
  )
}

export default Noteitem
