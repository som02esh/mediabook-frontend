import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="http://localhost:4000" 
  const [notes, setNotes] = useState([]);
  
  const getAllNotes=async ()=>{
    const getNotes= await fetch(host+"/api/notes/allNotes",{
      method:"GET",
      headers:{
        "auth-token": localStorage.getItem("auth-token")
      },
    })
    const json= await getNotes.json();
    setNotes(json.allNotes)
  }  




  // adding a new note
  const addNote= async (title,description,tag,alert)=>{
     const res = await fetch(host+"/api/notes/createNote",{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      },
      body:JSON.stringify({title,description,tag})
    })
    if(res) props.showAlert("One note added succesfully","success")
    getAllNotes();
  }

  // delete a note
  const deleteNote=async (id)=>{
    const res=await fetch(host+"/api/notes/deleteNote/"+id,{
      method:'DELETE',
      headers:{
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    if(res) props.showAlert("One note deleted succesfully","success")
    const newNote=notes.filter((note)=>{return note._id!==id})
    setNotes(newNote)
  }

  // edit a note
  const updateNote= async (note,alert)=>{
    const id=note.id;
    const title=String(note.utitle)
    const description=String(note.udescription)
    const tag=String(note.utag)
    const res = await fetch(host+"/api/notes/editNote/"+id,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      },
      body:JSON.stringify({title,description,tag})
    })
    if(res) props.showAlert("One note updated successfully","success")
    getAllNotes();

  }





  return (
    <NoteContext.Provider value={{notes ,addNote, deleteNote, updateNote, getAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
