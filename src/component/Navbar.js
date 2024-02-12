import React from "react";
const { Link, useLocation ,useNavigate} = require("react-router-dom");

function Navbar() {
  const location =useLocation();
  const navigate=useNavigate()
  // console.log(location)
  const handleClick=()=>{
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user")
    navigate('/login')
  }
  const user=localStorage.getItem("user")
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 " style={{position:"sticky"}}>
      <Link className="navbar-brand " to="/">
        <strong>Mediabook</strong>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className={"nav-item "+location.pathname==='/'?"active":""}>
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={"nav-item "+location.pathname==='/profile'?"active":""}>
            <Link className="nav-link" to="/profile">
              Profile <span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className={"nav-item "+location.pathname==='/myprofile'?"active":""}>
            <Link className="nav-link" to="myprofile">
              MyProfile
            </Link>
          </li>
        </ul>
      {localStorage.getItem("user") && <h4 className="text-light mr-2 mt-2">Welcome {user.split(" ")[0]}!!</h4>}
          
        <form className="d-flex">
          {!localStorage.getItem("auth-token") && <><Link className="btn btn-secondary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-secondary mx-1" to="/signup" role="button">
              Signup
            </Link></> }
          {localStorage.getItem("auth-token") && <button className="btn btn-secondary mx-2 mt-2" onClick={handleClick}>Log Out</button> } 
          </form>
      </div>
    </nav>
  );
}

export default Navbar;
