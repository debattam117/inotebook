import './App.css';
import React from 'react';
import {Route, Routes,} from "react-router-dom";
import Navbar from './Component/Navbar';
import About from './Component/About';
import Home from './Component/Home';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <div>
      
      <NoteState>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
        </Routes>
        </div>
        </NoteState>
    </div>
  );
}

export default App;
