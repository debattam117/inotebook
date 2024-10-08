
import React, { useState } from "react";
//import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

  const host = "http://localhost:5000"

    const notesInitial=[];

    const [notes,setNotes]= useState(notesInitial);

//Fetch all Note

const getNote= async()=>{

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
   
  });
  
   const json=await response.json();
   console.log(json);
   setNotes(json)
}
    //Add Note

    const addNote= async(title,description,tag)=>{

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      
     //TODO : API Calls
      // console.log("Note added")
      // const note={
      //   "_id": "65a8d32049ccce076faa8e535s322",
      //   "user": "65a540e14627e42008e51c811",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2024-01-18T07:28:32.704Z",
      //   "__v": 0
      // };

      const note = await response.json();
      setNotes(notes.concat(note))

    }

    //Delete Note

    const deletNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      console.log("Delete node " + id);
      const newNote = notes.filter((note) => note._id !== id);
      setNotes(newNote);
    }
    

    //Edit Note

    const editNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log(json);
    
      let newNotes = [...notes];
    
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      
      setNotes(newNotes);
    }
    


    return (

          <NoteContext.Provider value={{notes,setNotes,addNote,deletNote,editNote,getNote}}>
            {props.children}
          </NoteContext.Provider>


    )


}

export default NoteState;