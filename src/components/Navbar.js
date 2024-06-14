import React, { useState }  from "react";
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Navbar(props) {

  let navigate=useNavigate('');
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  const ProfileHandler= async(e)=>{
      e.preventDefault();
      const url=`http://localhost:5000/api/auth/getuser`
      const response = await fetch(url, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          },
        });
      const json=await response.json();
      console.log(json);
      props.setUserdetail({name:json.user.name,email:json.user.email,log:json.user.date});
      navigate('/profile');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            MyNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>:<div><button onClick={ProfileHandler} className="btn btn-danger mx-2"><i className="fa-solid fa-user"></i></button>
            <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button> 
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
