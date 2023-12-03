import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useState } from "react";

function AddNote(props) {
  const context = useContext(NoteContext);
  const {addNote} = context;
    const [note, setNote] = useState({title: "",description: "",tag: ""});
    const handleSubmit = (e) => {
      e.preventDefault();
      addNote(String(note.title), String(note.description), String(note.tag));
      setNote({title:"",description: "",tag: ""})
    };
    const handleChange = (e) => {
      setNote({ ...note, [e.target.name]: [e.target.value] });

    };
  return (
    <div id="mb-5">
      <h2>Add a note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className="form-control" id="title" value={note.title} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input name="description" type="text" className="form-control" id="description" value={note.description} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input name="tag" type="text" className="form-control" id="tag" value={note.tag} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-warning">
        Add Note
        </button>
      </form>
      </div>
  )
}

export default AddNote
