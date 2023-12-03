import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="https://inotebook-server-m9df.onrender.com" 
  const [notes, setNotes] = useState([]);
  const [data,setData] = useState(false)

  
  const getAllNotes=async ()=>{
    const getNotes= await fetch(host+"/api/notes/allNotes",{
      method:"GET",
      headers:{
        "auth-token": localStorage.getItem("auth-token")
      },
    })
    const json= await getNotes.json();
    setNotes(json.allNotes)
    setData(true)
  }  




  // adding a new note
  const addNote= async (title,description,tag,alert)=>{
      setData(false)
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
    setData(false)
    await fetch(host+"/api/notes/deleteNote/"+id,{
      method:'DELETE',
      headers:{
        "auth-token": localStorage.getItem("auth-token")
      }
    })
    getAllNotes()
  }

  // edit a note
  const updateNote= async (note,alert)=>{
    setData(false)
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
    <NoteContext.Provider value={{data,notes ,addNote, deleteNote, updateNote, getAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
