import axios from "../../components/axios/axios";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';

const ReplyForum = ({postId}) => {
const [replyPost, setReplyPost] = useState('');
const { user } = useAuthContext();
const [isReply, setIsReply] = useState(false);


    const handleSubmitReply = postId => async (e) =>{
      console.log(postId, "postId")
      console.log(replyPost, "reply")

        e.preventDefault();
        console.log(postId)
        const response = await axios.post(
          "api/post/addSubPost",
          {
            postId : postId,
            post: replyPost ,
            dateTime: "2022-11-03T05:38:12.168Z"
          },
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.data;
    
        if (response.status === 200) {
          // alert("What is happening");
          window.location = "/forum";
        }
    }

    const updateReply  = () => {
        // console.log(id)
        setIsReply(true)
        // setReplyId(id)
      }
    

    return ( 
    <div>
              <button onClick={updateReply}>Reply</button>

{isReply ? 
        <form className='login' onSubmit={handleSubmitReply(postId)}>
        <input type ='text' placeholder='Post your thought' value={replyPost} onChange={(e) => setReplyPost(e.target.value)}/><br></br>
        <button >Post</button>
        </form>
     : null}




    </div> );
}
 
export default ReplyForum;