import { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from "../components/axios/axios";



export const useSignup = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} =  useAuthContext;


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
                var json = await response.data
        
                if (response.status === 200) {
                    console.log("status 200")
                    localStorage.setItem('user', JSON.stringify(json))
                    dispatch({type: 'LOGIN', payload: json})
                    setIsLoading(false)
                }

        } catch (error) {
            setIsLoading(false)
            setStatus(error.response.data.mssg)
            setError(error.response.data.error)
        }
    }

    return {signup, error, status, isLoading}
} 