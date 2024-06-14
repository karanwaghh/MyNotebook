import React from 'react';

function Profile(props) {
  return (
    <div className="container" style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
        <i className="fa-solid fa-user fa-10x mb-4"></i>
        </div>
        <div style={{padding:"10vh",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name :</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={props.userdetail.name}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Email :</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={props.userdetail.email}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Account Created :</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={props.userdetail.log}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile