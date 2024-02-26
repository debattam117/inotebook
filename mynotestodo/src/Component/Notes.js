import React , { useContext } from "react";
import noteContext from '../Context/notes/noteContext';
import Noteitem from "./Noteitem";
import Addnote from './Addnote';

const Notes = () => {

    const context= useContext(noteContext);
    // eslint-disable-next-line
    const{notes,getNote}=context;

  return (
    <>
     <Addnote/>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return<Noteitem key={note._id}  note={note}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
