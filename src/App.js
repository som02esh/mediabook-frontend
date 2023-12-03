import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/routeComponents/Home";
import About from "./component/routeComponents/About";
import NoteState from "./context/notes/NoteState";
import Login from "./component/routeComponents/Login";
import Signup from "./component/routeComponents/SignUp";
import { useState } from "react";
import Alert from "./component/Alert";
function App() {
  const [alert,setAlert] =useState(null)
  const showAlert=(msg,type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(()=>{setAlert(null)},2000)
  }
  return (
    
    <NoteState showAlert={showAlert}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Alert alert={alert}></Alert>
        <Routes>
          <Route path="/" element={<Home  showAlert={showAlert}/>}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route path="/signup" element={<Signup showAlert={showAlert} />}></Route>
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
