import React,{useEffect, useState} from 'react'
// import NoteContext from '../context/notes/NoteContext';
function GlobalNoteitem(props) {
    // const context=useContext(NoteContext)
      const {note}=props;
      const [postUser,setPostUser]=useState({name:"",profilePhoto:""})
      const host="http://localhost:5000"
      const userAuthenticate=async()=>{
        const res = await fetch(host+"/api/notes/getPostUser",{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({id:note.userId})
      })
      // const response= await res.json()
      const json=await res.json()
      const data=json.user
        setPostUser({name:data.name,profilePhoto:data.profilePhoto})
        // console.log(json.user)
    }
      useEffect(()=>{
        userAuthenticate()
      },[])
    return (
        <div className="card bg-dark text-warning ml-1 mb-1 noteItem " style={{height:"600px"}} >
              <div className="card-body">
                <img src={postUser.profilePhoto} alt="" width="45px" height="45px" />
              <h4 className="card-title text-light" >{postUser.name}</h4>
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
