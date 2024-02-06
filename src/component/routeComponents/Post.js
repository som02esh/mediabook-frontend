
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Post.css"

const Post = () => {
  const post=useParams()
  const postId=post.noteId
  const userId=localStorage.getItem("uid")
  const uname=localStorage.getItem("user")
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [particularPost, setParticularPost] = useState({description:"",postImg:"",userId:null,date:null})
  const [postUser,setPostUser]=useState({name:"",profilePhoto:""})
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [time, setTime] = useState("");
  const host="https://mediabook-server.vercel.app"
  // const host="http://localhost:5000"
  const addComment = (e) => {
    e.preventDefault();
    fetch(host+'/api/notes/add_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({postId,userId,uname,comment}),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setComment('');
      });
  };
const getComments=async ()=>{
  const getNotes= await fetch(host+`/api/notes/get_comments/${postId}`,{
    method:"GET",
    headers:{
      'Content-Type': 'application/json',
    },
  })
  const data= await getNotes.json();
  setAllComments(data.comments);
}  

const getPost=async()=>{
  const res = await fetch(host+"/api/notes/getParticularNote",{
    method:'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({post_id:postId})
})
const json=await res.json()
const data=json.particularnote
setParticularPost({description:data.description,postImg:data.postImg,userId:data.userId,date:data.date})
userAuthenticate(data.userId)
timestamp(data.date)
}

const userAuthenticate=async(uid)=>{

  const res = await fetch(host+"/api/notes/getPostUser",{
    method:'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({id:uid})
})
const json=await res.json()
const data=json.user
// console.log(data)
  setPostUser({name:data.name,profilePhoto:data.profilePhoto})
  // console.log(data.name)
}

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
            body:JSON.stringify({postId,userId})
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
            const response = await fetch(host+`/api/notes/getLikes/${postId}`,{
              method:'GET',
              headers:{
                "Content-Type": "application/json"
              }
            })
            const json=await response.json()
            const data=json.likeCount
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
            body:JSON.stringify({postId,userId})
          })
          const json=await response.json()
          const data=json.status
          setLike(data);
      } catch (error) {
          console.error('Error getting like count:', error);
      }
  };
   
  const timestamp = (dt)=>{
const dateObject = new Date(dt);
const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
const date = dateObject.getDate();
const tt=date+"-"+month+"-"+year
setTime(tt)
  }
 useEffect(()=>{
  getPost()
  getComments()
  getLikeCount()
  getLikeStatus()
 },[])    
  return (
    <>
    <div class="post-container">
    <div class="post-header">
        <img src={postUser.profilePhoto} alt="Profile" className="profile-photo"/>
        <div>
            <div class="username">{postUser.name}</div>
            <div class="post-date">{time}</div>
        </div>
    </div>
    <div className="postImage" style={{backgroundImage:`url(${particularPost.postImg})`}}>
    <img src={particularPost.postImg} alt="Post" className="post-image" onDoubleClick={handleLikes}/>
    </div>
    <div class="post-content">
        <p>{particularPost.description}</p>
    </div>
    <div class="interactions">
        <div class="like-btn">
        {like ? (
              <>
              <AiFillHeart size={30} className="text-danger" onClick={handleLikes} style={{ cursor: "pointer" }}/>{likeCount}</>) : (
              <>
              <AiOutlineHeart size={30} onClick={handleLikes} style={{ cursor: "pointer" }}/>{likeCount}</>
            )}
        </div>
        <div class="comment-btn">Comment</div>
    </div>
    <form onSubmit={addComment}>
      <textarea placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} style={{height:"100px",width:"100%"}}></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div id="comments">
        {allComments.map((comments, index) => (
          <div key={index}> {`${comments.uname}: ${comments.comment}`}</div>
        ))}
      </div>
</div>
    
</>
);
};

export default Post;
