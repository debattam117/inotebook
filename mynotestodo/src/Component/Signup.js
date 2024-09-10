import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

 
  let navigate = useNavigate();
  const [profileinfo, setProfileinfo] = useState({ name:"", email: "", password: "",cpassword: "" });
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
        const {name,email,password}=profileinfo;
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': '' // Add your token if required
                },
                body: JSON.stringify({ name,email,password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
              // Redirect
              localStorage.setItem('token', json.authtoken);
              navigate("/");
              props.showAlert("Account Created Successfully","success");
          } else {
              props.showAlert(json.errors,"danger");
          }
      } catch (error) {
          console.error("Error during login:", error);
      }

  }


  const onChange = (e) => {
    setProfileinfo({ ...profileinfo, [e.target.name]: e.target.value });
};


  return (
    <div>
      <div>
            <h1>This is SignUp Page</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={profileinfo.name} name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={profileinfo.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={profileinfo.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={profileinfo.cpassword} onChange={onChange} minLength={5} required  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Signup
