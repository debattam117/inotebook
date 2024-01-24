import React,{useContext,useEffect} from 'react';
import noteContext from '../Context/notes/noteContext';

const About = () => {

  const a=useContext(noteContext);
  
  useEffect(()=>{

    a.update();
// eslint-disable-next-line
  },[])


  return (
    <div>
      <h1>This is about {a.state.name} and he is {a.state.age} years old. </h1>
    </div>
  )
}

export default About
