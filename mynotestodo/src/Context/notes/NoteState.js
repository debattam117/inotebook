
import React, { useState } from "react";
//import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

  const host = "http://localhost:5000"

    const notesInitial=[];

    const [notes,setNotes]= useState(notesInitial);

//Fetch all Note

const getNote= async(title,description,tag)=>{

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNTQwZTE0NjI3ZTQyMDA4ZTUxYzgxIiwicGFzcyI6IiQyYSQxMCRqN0NJSmNqaUIyR2pvbzZyTkdhOFguaXp1Ymc1TE15UEUwL1UvT1BSLnhiVGQwVUE4ZUZFTyIsIm5hbWUiOiJkaXAifSwiaWF0IjoxNzA1Mzg5NTI4fQ.6dd1Nx8cN6tdPnjf69WKJB75vYdhifS0baL9SC-qCAc"
    },
   
  });
  
   const json=await response.json();
   console.log(json);
}
    //Add Note

    const addNote= async(title,description,tag)=>{

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNTQwZTE0NjI3ZTQyMDA4ZTUxYzgxIiwicGFzcyI6IiQyYSQxMCRqN0NJSmNqaUIyR2pvbzZyTkdhOFguaXp1Ymc1TE15UEUwL1UvT1BSLnhiVGQwVUE4ZUZFTyIsIm5hbWUiOiJkaXAifSwiaWF0IjoxNzA1Mzg5NTI4fQ.6dd1Nx8cN6tdPnjf69WKJB75vYdhifS0baL9SC-qCAc"
        },
        body: JSON.stringify({title, description, tag})
      });
      
     //TODO : API Calls
      console.log("Note added")
      const note={
        "_id": "65a8d32049ccce076faa8e535s322",
        "user": "65a540e14627e42008e51c811",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-01-18T07:28:32.704Z",
        "__v": 0
      };
      setNotes(notes.concat(note))

    }

    //Delete Note

    const deletNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "YOUR_AUTH_TOKEN"
        }
      });
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
          "auth-token": "YOUR_AUTH_TOKEN"
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
    
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