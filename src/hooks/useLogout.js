import { useAuthContext } from './useAuthContext'
import { useWatchListContexts } from './useWatchListContext'
import { useForumContext } from './useForumContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: watchListDispatch } = useWatchListContexts()
  const { dispatch: forumListDispatch } = useForumContext()


  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    window.location = '/login';
    // Clearing global state when logging out 
    watchListDispatch({ type:'SET_WATCHLIST', payload: null })
    forumListDispatch({ type:'SET_POSTS', payload: null })
  }

  return { logout }
}