import { createContext, useReducer } from "react";

export const WatchListContexts = createContext()

export const watchListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WATCHLIST':
            console.log("State:", state.watchLists)
            return {
                watchLists: action.payload
            }
        case 'ADD_WATCHLIST':
            return {
                watchLists: [action.payload, ...state.watchLists]
            }
        case 'DELETE_WATCHLIST':
            return {
                // this "action.payload" would be an array of workout objects with the newly created workout
                // workouts: state.workouts.filter((w) => w._id !== action.payload._id)
                watchLists: state.watchLists.filter((watchList) => watchList["favid"] !== action.payload["favid"])
            }
        default:
            return state
    }
}




export const WatchListContextsProvider = ({ children }) => {
    // useReducer is similar to a useState whereby the "dispatch" is use to update the variable state
    // and it takes in two parameters. first is a function and the second would be the default value 
    const [state, dispatch] = useReducer(watchListReducer, {
        watchLists: null
    })

    // when the "dispatch" function is called, the "useReducer"'s function (workoutReducer) would be called 
    // the values within the "dispatch" function is the "action"
    // dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]})
    // console.log("WatchList Context State Delete: ", state)

    return(
        <WatchListContexts.Provider value={{...state, dispatch}}>
            { children }
        </WatchListContexts.Provider>
    )
}