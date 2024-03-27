import React , { useContext, useEffect, useRef,useState } from "react";
import noteContext from '../Context/notes/noteContext';
import Noteitem from "./Noteitem";
import Addnote from './Addnote';

const Notes = () => {

    const context= useContext(noteContext);
    // eslint-disable-next-line
    const{notes,getNote}=context;
    const{editNote}=context;
    const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"Default"})

    useEffect(()=>{
       getNote()
// eslint-disable-next-line
    },[])

    const updateNote =(currentNote)=>
    {
          ref.current.click();
          setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

    const ref=useRef(null);
    const refClose=useRef(null);

    const handleClick=(e)=>
    {
      //  e.preventDefault();
         editNote(note.id,note.etitle,note.edescription,note.etag);
         refClose.current.click();
    }

    const onChange=(e)=>
    {
        setNote({...note,[e.target.name]:e.target.value})
    }


  return (
    <>
     <Addnote/>
      
   
      <button ref={ref}  type="button" className="btn btn-primary  d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <form className='my-3'>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                      </div>
                      {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                </form>

              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
              </div>
            </div>
          </div>
        </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return<Noteitem key={note._id}  updateNote={updateNote}  note={note}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
