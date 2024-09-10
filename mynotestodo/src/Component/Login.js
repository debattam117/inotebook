import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {

    let navigate = useNavigate();

    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': '' // Add your token if required
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert("Loggedin Successfully","success");
            } else {
                props.showAlert("Please provide correct credentials","danger");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>This is Login Page</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credential.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
