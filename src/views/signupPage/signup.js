import Password from 'antd/lib/input/Password'
import React, { Component, useState } from 'react'
import './signup.css'
import { useSignup } from "../../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, username, password, confirmPass)
  }


return (
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
    <p>{error}</p>
      <p></p>{error && <div className="error">{error}</div>}
  
  </form>
)

}

//   render() {
//     return (        
//         <div className='grid-container'>
//         <div class="grid-item">
//             <div className='grid-item-1'>
//                 <h1>TEST</h1>
//             </div>
//             </div>
//         <div class="grid-item">
//         <h1>SIGNUP</h1>
//         </div>
// </div>
//     )
//   }
// }

export default Signup