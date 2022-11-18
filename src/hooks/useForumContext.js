import { ForumContext } from "../context/ForumContext";
import { useContext } from "react";

export const useForumContext = () => {
    const context = useContext(ForumContext)

    if(!context){
    throw Error('useForumContexts must be used inside an ForumContextProvider')
    }

    return context
}