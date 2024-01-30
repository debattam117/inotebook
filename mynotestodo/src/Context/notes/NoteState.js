
import React, { useState } from "react";
//import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

    const notesInitial=[
      {
        "_id": "65a8d32049ccce076faa8e53",
        "user": "65a540e14627e42008e51c81",
        "title": "morning note",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2024-01-18T07:28:32.704Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b6052",
        "user": "65a540e14627e42008e51c81",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b6052",
        "user": "65a540e14627e42008e51c81",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b6052",
        "user": "65a540e14627e42008e51c81",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      },
      {
        "_id": "65a8d49812d98a2ab84b6052",
        "user": "65a540e14627e42008e51c81",
        "title": "Good",
        "description": ".",
        "tag": "personal",
        "date": "2024-01-18T07:34:48.713Z",
        "__v": 0
      }
    ];

    const [notes,setNotes]= useState(notesInitial);

    return (

          <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
          </NoteContext.Provider>


    )


}

export default NoteState;