import React, { useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom'
import '../css/signUp.css';
import access_account from '../svg/access_account.svg'
import axios from '../api/axios.js';
import { generateRandomCode } from '../utils/randomCodeGenerator.js';


function SignUpFormComponent() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      // Passwords don't match, handle this case accordingly.
      alert("Passwords do not match");
      return;
    }

    // You can implement your sign-up logic here.
    const res = await axios.post('/users/register',{
      username,
      email,
      verificationCode,
      password,
    }).then(()=> {
      localStorage.setItem('username', username);
      setSubscribed(true);
    }).catch(e => console.log(e));
  };
  
  useEffect(()=>{
    setVerificationCode(generateRandomCode());
  },[])
  

  return (
    <div>
        
      <div className='form-container'>
      <img src={access_account} alt='' height={"180vh"}/>
      {subscribed ? (
        <Navigate to={'/verify-code'}  replace={true}/>
      ) : (
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
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

          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />

          <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
      )}
      </div>
    </div>
  );
}

export default SignUpFormComponent;