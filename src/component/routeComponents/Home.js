import GlobalNoteItem from "../globalNoteitem";
import NoteContext from "../../context/notes/NoteContext";
import React,{useContext,useEffect} from "react";
import {useNavigate} from "react-router-dom"
function Home() {
  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const { globalNote,globalNotes,getUser} = context;
  
  useEffect(() => {
      if(localStorage.getItem("auth-token")){
          globalNotes();
          getUser();
      }
      else{
          navigate('/login')
      }
  }, []);
  return (
    <>

<div className="d-flex flex-wrap notes">
        {/* <center style={notes.length===0?{display:"contents"}:{display:"none"}}><p>No Notes to display!!</p></center> */}
        {globalNote.map((note) => {
          return (
            <GlobalNoteItem
              key={note._id}
              note={note}        
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
