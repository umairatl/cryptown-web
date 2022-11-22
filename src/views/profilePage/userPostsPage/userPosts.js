import Navbar from "../../../components/navbar/navbar";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import Post from "../../../components/post/post";
import { useUserPostsContext } from "../../../hooks/useUserPostsContext";


const UserPosts = () => {
    // const [postList, setPostList] = useState(null)
    const [ error, setError ] = useState("")

    const { user } = useAuthContext();
    const { postLists, dispatch } = useUserPostsContext()

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
        <div>
            <Navbar />
            <h1>
                <Link to="/profile" className="links">
                    Profile
                </Link>
            </h1>
            <div className="post-col">
                <h1>YOUR POSTS</h1>
                {postLists && postLists.map((post) => <Post key={post["postId"]} post={post}/>)}
                {error && <h2>{error}</h2>}
            </div>
        </div>
     );
}
 
export default UserPosts;
