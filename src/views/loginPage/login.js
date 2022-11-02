import React, { Component } from 'react'
import { useState } from 'react';

const Login = () => {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    return (
      <div className='.login-wrapper'>
      <h1>LOGIN</h1>

    <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
      {/* //   <form className='login_form'> */}
      {/* //       <h1>Login</h1>
      //       <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      //       <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> 

      //       <button type='"submit' className='submit-btn'>Submit</button>
      //   </form> */}


      
      </div>
    )
}

export default Login