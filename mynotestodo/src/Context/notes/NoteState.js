
import React, { useState } from "react";
//import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

    const notesInitial=[
      {
        "_id": "65a8d32049ccce076faa8e535",
        "user": "65a540e14627e42008e51c811",
        "title": "morning note",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2024-01-18T07:28:32.704Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b60524",
        "user": "65a540e14627e42008e51c812",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b60523",
        "user": "65a540e14627e42008e51c813",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b60522",
        "user": "65a540e14627e42008e51c814",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b60521",
        "user": "65a540e14627e42008e51c815",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      }
    ];

    const [notes,setNotes]= useState(notesInitial);


    //Add Note

    const addNote=(title,description,tag)=>{
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

    const deletNote=()=>{



    }

    //Edit Note

    const editNote=()=>{



    }
    


    return (

          <NoteContext.Provider value={{notes,setNotes,addNote,deletNote,editNote}}>
            {props.children}
          </NoteContext.Provider>


    )


}

export default NoteState;