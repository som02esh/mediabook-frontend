const { Link, useLocation } = require("react-router-dom");

function Navbar() {
  const location =useLocation();
  
  const handleClick=()=>{
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user")
  }
  const user=localStorage.getItem("user")
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 ">
      <Link className="navbar-brand " to="/">
        <strong>iNotebook</strong>
      </Link>
      {localStorage.getItem("user") && <h1>Welcome {user.slice(0,3)}!!</h1>}
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
          {/* <li className={"nav-item "+location.pathname==='/about'?"active":""}>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li> */}
        </ul>
        <form className="d-flex">
          {!localStorage.getItem("auth-token") && <><Link className="btn btn-secondary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-secondary mx-1" to="/signup" role="button">
              Signup
            </Link></> }
          {localStorage.getItem("auth-token") && <button className="btn btn-secondary mx-1" onClick={handleClick}>Log Out</button> }
            
          </form>
      </div>
    </nav>
  );
}

export default Navbar;
