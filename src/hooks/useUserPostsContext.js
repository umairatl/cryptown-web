import { UserPostsContext } from "../context/UserPostContext";
import { useContext } from "react";

export const useUserPostsContext = () => {
    const context = useContext(UserPostsContext)

    if(!context){
        throw Error('useUserPostsContext must be used inside an UserPostContextProvider')
    }

    return context
}