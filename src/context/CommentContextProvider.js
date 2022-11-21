// import React, { createContext, useReducer, useState } from 'react'
// import moment from 'moment';
// import { useAuthContext } from './hooks/useAuthContext';

// export const CommentContext = createContext();
// export const forumReducer = (state, action) => {
//     switch(action.type){
//         case 'POST_FORUM':
//             return {
//                 forum: [action.payload, ...state.forum]
//             }
//             default:
//                 return state
//     }
// }

//     return (
//         <CommentContext.Provider value={{comments, addComment, updateLikes, updatedisLikes}}>
//             {props.children}
//         </CommentContext.Provider>
//     )


// export default CommentContextProvider