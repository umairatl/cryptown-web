import React, { useState } from 'react'
import './signup.css'
import { useSignup } from "../../hooks/useSignup"
import Navbar from '../../components/navbar/navbar'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  const {signup, error, status, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, username, password, confirmPass)
  }


return (
  <div>
    <Navbar />
    <form className='signup' onSubmit={handleSubmit}>
      <label>Email</label>
      <input type ='email' onChange={(e) => setEmail(e.target.value)} value={email}/>

      <label>Username</label>
      <input type ='username' onChange={(e) => setUsername(e.target.value)} value={username}/>
    
      <label>Password</label>
      <input type ='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

      <label>Password</label>
      <input type ='confirmPass' onChange={(e) => setconfirmPass(e.target.value)} value={confirmPass}/>
    
      <button disabled={isLoading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
      <p>{status}</p>
   </form>
  </div>
)}

export default Signup