import React,{useEffect, useState} from 'react'
import { BiComment} from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import NoteContext from '../context/notes/NoteContext';
function GlobalNoteitem(props) {
    // const context=useContext(NoteContext)
      const {note}=props;
      const [postUser,setPostUser]=useState({name:"",profilePhoto:""})
      const [likeCount, setLikeCount] = useState(0);
      const [like, setLike] = useState(false);
      const userId=localStorage.getItem("uid")
      const host="https://mediabook-server.vercel.app"
      const handleLikes = async () => {
          try {
            if (!like) {
                    setLike(true);
                  } else {
                    setLike(false);
                  }
            const response = await fetch(host+"/api/notes/like",{
              method:'POST',
              headers:{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({postId:note._id,userId:userId})
            })
            const json=await response.json()
            const data=json.success
              if (data) {
                  getLikeCount();
              }
          } catch (error) {
              console.error('Error liking/unliking:', error);
          }
      };
  
      const getLikeCount = async () => {
          try {
              const response = await fetch(host+`/api/notes/getLikes/${note._id}`,{
                method:'GET',
                headers:{
                  "Content-Type": "application/json"
                }
              })
              const json=await response.json()
              const data=json.likeCount
              // console.log(data)
              setLikeCount(data);
          } catch (error) {
              console.error('Error getting like count:', error);
          }
      };
      const getLikeStatus = async () => {
        try {
            const response = await fetch(host+`/api/notes/getLikeStatus`,{
              method:'POST',
              headers:{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({postId:note._id,userId:userId})
            })
            const json=await response.json()
            const data=json.status
            // console.log(data)
            setLike(data);
        } catch (error) {
            console.error('Error getting like count:', error);
        }
    };
  
      
      // const host="http://localhost:5000"
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
      const dateObject = new Date(timestamp);  
      const year = dateObject.getUTCFullYear();
      const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = dateObject.getUTCDate().toString().padStart(2, '0');
      // Format the date as "YYYY-MM-DD"
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    }
      useEffect(()=>{
        userAuthenticate()
        getLikeCount()
        getLikeStatus()
      },[])
    return (
        <div className="card bg-dark text-warning ml-1 mb-1 noteItem " style={{height:"440px"}} >
              <div className="card-body">
                <div className="card-header d-flex">
                <img src={postUser.profilePhoto} alt="" width="45px" height="45px" className='mx-4 rounded-circle'/>
              <h4 className="card-title text-light my-2" >{postUser.name}</h4>
              {/* <h6 className="card-title text-light my-3" >{extractDateFromTimestamp(note.date)}</h6> */}
              {/* <h4 className="card-title text-light mx-3 my-2" >{note.date.split("-")[2]}</h4> */}
              </div>
                {/* <h4 className="card-title text-light" >{note.title}</h4> */}
                <div className="noteImg" style={{backgroundImage:`url(${note.postImg})`}} onDoubleClick={handleLikes}></div>
                <p className="card-text text-warning">
                  {note.description}
                </p>
                <div className="card-footer d-flex justify-content-between align-items">
                  <div>
            {like ? (
              <>
              <AiFillHeart size={30} className="text-danger" onClick={handleLikes} style={{ cursor: "pointer" }}/>{likeCount}</>) : (
              <>
              <AiOutlineHeart size={30} onClick={handleLikes} style={{ cursor: "pointer" }}/>{likeCount}</>
            )}
            </div>
            <BiComment size={30} style={{ cursor: "pointer" }} />
          </div>
              </div>
          </div>
    )
}

export default GlobalNoteitem
