import Navbar from "../../../components/navbar/navbar";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import Post from "../../../components/post/post";
import { useUserPostsContext } from "../../../hooks/useUserPostsContext";
import NormalDialog from "../../../components/Dialog/normalDialog";
import { useDialogContext } from "../../../hooks/useDialogContext";


const UserPosts = () => {
    // const [postList, setPostList] = useState(null)
    const [ error, setError ] = useState("")

    const { user } = useAuthContext();
    const { postLists, dispatch } = useUserPostsContext()
    const { userPost } = useDialogContext()


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await axios("api/post/getUserPosts", {
                    headers: {
                    Authorization: `Bearer ${user}`,
                    },
                });
                const json = await response.data;
            
                if (response.status === 200) {
                    const objKeyArr = Object.keys(json["postsObj"]).map(
                    (objKey) => json["postsObj"][objKey]
                    );
                    // setPostList(objKeyArr);
                    dispatch({ type: "SET_POSTS", payload: objKeyArr })
                }
            } catch (error) {
                setError(error.response.data.error)
            }
            
        };

        if (user && postLists === null) {
            fetchPosts();
        }

      }, [dispatch, user]);


    return ( 
            <div className="post-col">
                <h1>MY POSTS</h1>
                <div>
                    <div className="post-cont">
                {postLists && postLists.map((post) => <Post key={post["postId"]} post={post}/>)}
                {error && <h2>{error}</h2>}

                { userPost ?
                  <NormalDialog 
                  type="USER_POST"
                  dialogTitle="Delete Post" 
                  dialogMessage="Delete Successful"
                  /> : null
                }
                </div>
                </div>
            </div>
     );
}
 
export default UserPosts;
