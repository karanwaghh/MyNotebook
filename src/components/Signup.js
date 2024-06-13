import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function Signup(props) {
    const [credential,setCredential]=useState({name:"",email:"",password:""});
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const url=`http://localhost:5000/api/auth/createuser`
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password}), 
          });
          const json=await response.json();
          if(json.success){
            localStorage.setItem('token',json.data);
            navigate("/");
            props.showAlert("Loginned Sucessfully","success");
          }else{
            props.showAlert("Invalid credentials","danger");
          }
    }
    const onchange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" id="name" name='name' value={credential.name} onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credential.email} minLength={5} required aria-describedby="emailHelp" onChange={onchange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credential.password} minLength={5} required  onChange={onchange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup