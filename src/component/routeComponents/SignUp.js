import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const navigate=useNavigate();
    const userInitial={name:"",email:"",password:""}
    const [user,setUser]= useState(userInitial)
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const {name,email,password} = user
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password} = user
        const response = await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json()
        if(json.signup){
            localStorage.setItem("auth-token",json.authToken)
            localStorage.setItem("user",json.userName)
            navigate("/")
            props.showAlert(json.msg,"success")
        }
        else{
          props.showAlert(json.msg,"warning")
        }
    }
  return (
    <div className='container'>
      <h2>Sign Up to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" className="form-control" id="name" onChange={handleChange} value={name} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" className="form-control" id="email" onChange={handleChange} value={email} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" className="form-control" id="password" onChange={handleChange}  value={password} required/>
        </div>
        <button type="submit" disabled={password.length<8} className="btn btn-warning" >
        Sign Up
        </button>
        </form>
    </div>
  )
}

export default Signup
