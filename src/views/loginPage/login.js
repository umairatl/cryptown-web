import React from 'react'
import { useState, useEffect } from 'react';
import {useLogin} from '../../hooks/useLogin';

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
		<h5>LOGIN</h5>
    <form className='login' onSubmit={handleSubmit}>
        <input type ='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email}/><br></br>
        <input type ='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password}/><br></br>
      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error}</div>}
      <p>{status}</p>
      </form>
    </div>
)}

export default Login