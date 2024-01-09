import React from 'react'
// import NoteContext from '../context/notes/NoteContext';
function GlobalNoteitem(props) {
    // const context=useContext(NoteContext)
      const {note}=props;
    return (
        <div className="card bg-dark text-warning ml-1 mb-1 noteItem " style={{height:"350px"}} >
              <div className="card-body">
                <h4 className="card-title text-light" >{note.title}</h4>
                <div className="noteImg" style={{backgroundImage:`url(${note.postImg})`}}></div>
                <p className="card-text text-warning">
                  {note.description}
                </p>
              </div>
          </div>
    )
}

export default GlobalNoteitem
