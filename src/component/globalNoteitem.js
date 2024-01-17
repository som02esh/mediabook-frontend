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
    function extractDateFromTimestamp(timestamp) {
      // Create a new Date object from the timestamp
      const dateObject = new Date(timestamp);
    
      // Extract year, month, and day
      const year = dateObject.getUTCFullYear();
      const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = dateObject.getUTCDate().toString().padStart(2, '0');
    
      // Format the date as "YYYY-MM-DD"
      const formattedDate = `${day}-${month}-${year}`;
    
      return formattedDate;
    }
      useEffect(()=>{
        userAuthenticate()
      },[])
    return (
        <div className="card bg-dark text-warning ml-1 mb-1 noteItem " style={{height:"400px"}} >
              <div className="card-body">
                <div className="d-flex">
                <img src={postUser.profilePhoto} alt="" width="45px" height="45px" className='mx-4 rounded-circle'/>
              <h4 className="card-title text-light mx-3 my-2" >{postUser.name}</h4>
              <h6 className="card-title text-light mx-3 my-2" >{extractDateFromTimestamp(note.date)}</h6>
              {/* <h4 className="card-title text-light mx-3 my-2" >{note.date.split("-")[2]}</h4> */}
              </div>
                {/* <h4 className="card-title text-light" >{note.title}</h4> */}
                <div className="noteImg" style={{backgroundImage:`url(${note.postImg})`}}></div>
                <p className="card-text text-warning">
                  {note.description}
                </p>
                <div className="d-flex justify-content-between align-items">
                <i className="fa-light fa-heart fa-solid" ></i>
                <i className="fa-solid fa-comment"></i>
              </div>
              </div>
          </div>
    )
}

export default GlobalNoteitem
