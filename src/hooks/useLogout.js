import { useAuthContext } from './useAuthContext'
import { useWatchListContexts } from './useWatchListContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: watchListDispatch } = useWatchListContexts()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    window.location = '/login';
    // Clearing workout global state when logging out 
    watchListDispatch({ type:'SET_WATCHLIST', payload: null })
  }

  return { logout }
}