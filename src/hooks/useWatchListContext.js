import { WatchListContexts } from "../context/WatchListContext";
import { useContext } from 'react'

export const useWatchListContexts = () => {
    const context = useContext(WatchListContexts)

    if(!context){
        throw Error('useWatchListContexts must be used inside an WatchListContextsProvider')
    }

    return context
}