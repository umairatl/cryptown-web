import { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from "../components/axios/axios";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } =  useAuthContext();

    const signup = async (email, username, password, confirmPass) => {
    setIsLoading(true)
    setError(null)
    setStatus(null)

        try{
            const response = await axios.post('api/user/signup',
                {
                    'email' : email,
                    'username': username, 
                    'password' :password, 
                    'confirm_password': confirmPass
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }

                })
                const json = await response.data
        
                if (response.status === 200) {
                 localStorage.setItem('user', JSON.stringify(json.userJwt))
                 localStorage.setItem('username', JSON.stringify(json.user))

                 dispatch({type: 'LOGIN', payload: json})
                 console.log("windows 1")
                 setIsLoading(false)
                 console.log("windows 2")
                 window.location = '/market';
                 console.log("windows")
               }
           
               } catch(error){
                console.log('still in')
                 setIsLoading(false)
                 setStatus(error.response.data.mssg)
                 setError(error.response.data.error)
               }
             }

    return {signup, error, status, isLoading}
} 