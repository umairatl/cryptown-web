import React from 'react'
import { useState, useEffect } from 'react';
import {useLogin} from '../../hooks/useLogin';
import {Link} from "react-router-dom";
import img from '../../asset/signup.png'
import '../../views/loginPage/login.css'
import logo from '../../asset/Assetlogo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, isLoading, error, status} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
}

return (
  <div>
  {/* <img src={logo} width='80%'/> */}
		<h5>LOGIN</h5>
    <form className='login' onSubmit={handleSubmit}>
        <input type ='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email}/><br></br>
        <input type ='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password}/><br></br>
      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error}</div>}
      <p>{status}</p>
      </form>
    </div>
)

}

export default Login