// import React from "react";

// import { useState } from "react";
// import {useForumContext} from '../../hooks/useForumCOntext';

// const Forum = () => {
//   const { dispatch } = useForumContext();
//   const [email, setEmail] = useState('');
//   const [comments, setComments] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const workout = {title, load, reps}
//     const response = await fetch('/api/workouts', {
//       method: 'POST',
//       body: JSON.stringify(workout),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       setEmptyFields(json.emptyFields)
//     }
//     if (response.ok) {
//       setTitle('')
//       setLoad('')
//       setReps('')
//       setError(null)
//       setEmptyFields([])
//       console.log('new forum added', json)
//       dispatch({type: 'POST_FORUM', payload: json})
//     }
//   }


//   const addComment = comment => {
//         setEmail(userName(parseInt((Math.random() * 10) + 1)))
//         setComments([... comments,{
//             "post": "THIS IS A TEST MAIN POST 44444444!!!",
//             "dateTime": "2022-11-03T05:38:12.168Z"
//         }])
//     }

//         const updateLikes = new_comment => {
//         const index = comments.findIndex( comment => comment.id === new_comment.id )
//         const copyComments = [...comments]
//         copyComments[index].likes += 1;
//         copyComments.sort((a, b) => b.likes-a.  likes)
//         setComments(copyComments)
//     }

//     const updatedisLikes = new_comment => {
//         const index = comments.findIndex( comment => comment.id === new_comment.id )
//         const copyComments = [...comments]
//         copyComments[index].dislikes -= 1;
//         copyComments.sort((a, b) => b.dislikes-a.dislikes)
//         setComments(copyComments)
//     }    


//     return ( 
//     <div>

//     </div> );
// }
 
// export default Forum;