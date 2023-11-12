import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Assuming you're using React Router for routing
import mobile_login from '../svg/mobile_login.svg'
import axios from '../api/axios.js'
import '../css/signIn.css';
import AuthContext from '../context/AuthProvider.js';
import { registerSW } from './swRegister.js';




function SignInFormComponent() {

  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
        await axios.post('/users/login',{
        email,
        password
      },{
        
        withCredentials:true
      }).then(d => {
        
        setAuth({
          user:d.data.username, 
          accessToken: d.data.accessToken
        })

        // registering service worker hier after sucdcessfully loggedin
        registerSW();
        
      })

    }
    catch(e) {console.log(e)}

    
  };

  useEffect(() => {

    //changed !! 

    //if(auth.user)  window.location.href = `${process.env.REACT_APP_CLIENT_URL}/first-layout`;

  },[auth])

  return (
    <div>
      <div className='form-container'>
      <img src={mobile_login} alt='' height={"180vh"}/>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Sign In </button>
          {
            auth.user && <Navigate to ={`/first-layout`}></Navigate>
          }
        
      </form>

      <div id='sous-form-text'>
        Not a member?<Link to="/signup"><p id='signup-link'>signUp</p></Link>
      </div>
      </div>
    </div>
  );
}

export default SignInFormComponent;
