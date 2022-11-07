import { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from "axios";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLaoading, setIsLoading] = useState(null);
    const {dispatch} =  useAuthContext;


    const signup = async (email, username, password, confirmPass) => {
        console.log('in')
        setIsLoading(true)
        setError(null)

        // useEffect(() => {
            const userSignup = async () => {
                console.log('in 2')
                console.log(email, username, password, confirmPass)
                const response = await axios.post('https://localhost:5000/api/user/signup',
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
                    console.log("status 200")
                    localStorage.setItem('user', JSON.stringify(json))
                    dispatch({type: 'LOGIN', payload: json})
                    setIsLoading(false)
                }

                // if(response.status === 400){
                //     console.log(json, "TEST")
                //     setIsLoading(false)
                //     setError(json.data.error)
                // }
            }

            try {
                userSignup()
            } catch (error) {
                console.log(error, "error")
            }
        //   }, []);


        // const response = async () => {
        // console.log('in 2')
        //     console.log(email, password, "res")
        //     const response = await axios.post('https://localhost:5000/api/user/signup',
        //     {
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({ email, password })
        //     },
        //     )
            
        //     const json = await response.data

        //     if (response.status === 200){
        //         localStorage.setItem('user', JSON.stringify(json))
        //         dispatch({type: 'LOGIN', payload: json})
        //         setIsLoading(false)
        //     }

    }

    return {signup, isLaoading, error}
} 