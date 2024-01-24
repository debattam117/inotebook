import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

    const s1={
        "name":"Debattam",
        "age":"23"
    }

    const [state, setState]=useState(s1);

    const update =()=>
     {
        setTimeout(()=>{

         setState({
            "name":"Debattam Bhattacharjee",
            "age":"23 years and 7 months"
         })
        },2000)
     }

    return (

          <NoteContext.Provider value={{state,update}}>
            {props.children}
          </NoteContext.Provider>


    )


}

export default NoteState;