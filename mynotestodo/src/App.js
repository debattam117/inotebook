import './App.css';
import React from 'react';
import {Route, Routes,} from "react-router-dom";
import Navbar from './Component/Navbar';
import About from './Component/About';
import Home from './Component/Home';
import NoteState from './Context/notes/NoteState';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { useState } from 'react';

function App() {


 const[alert,setAlert]=useState(null);
 const showAlert=(messsage,type)=>{
    setAlert({message:messsage,type:type})
    setTimeout(() => {
      setAlert(null);
    },1500);
 }

  return (
    <div>
      
      <NoteState>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Login" element={<Login showAlert={showAlert}/>}/>
          <Route path="/Signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
        </NoteState>
    </div>
  );
}

export default App;
