import React, { useEffect, useState } from 'react';
import {Navigate} from "react-router-dom"
import { generateRandomCode } from '../utils/randomCodeGenerator.js';
import axios from '../api/axios'
import '../css/verifyCode.css'

const VerifyCodeComponent = () => {

  const [code, setCode] = useState(['', '', '', '', '']);
  const [currentUser,setCurrentUser] = useState(null);
  const [newCode, setNewCode] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };
  
  const handleSendCode = async () => {
    
    const res = await axios.post('/users/verify-code',{
        username:(currentUser).toString(),
        code : parseInt(code.join(''), 10),
    })
    if(res) {
     
      if(parseInt(code.join(''), 10) === res.data.verificationCode ) {
         setVerified(true);
      }
    }
  }
  const handleResendCode = async() => {

    const res = await axios.post('/users/re-send-code',{
      username:currentUser, 
      new_verificationsCode:newCode,
    }).then((d) => console.log(d.data))
      .catch(e => console.log(e))
    
  }
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setCurrentUser(storedUsername);
    }
  },[])
  useEffect(()=>{
    setNewCode(generateRandomCode());
  },[])
  useEffect(() => {
    verified && <Navigate to="/signin"> </Navigate> 
  },[verified])
  return (
    <>
      <div className="verify-code-component-container">
        <h1> Please Check your Inbox, We sent you a verification Code </h1>
        <div className="code-input-container">
        <input
          type="text"
          value={code[0]}
          onChange={(e) => handleInputChange(e, 0)}
          maxLength="1"
        />
        <input
          type="text"
          value={code[1]}
          onChange={(e) => handleInputChange(e, 1)}
          maxLength="1"
        />
        <input
          type="text"
          value={code[2]}
          onChange={(e) => handleInputChange(e, 2)}
          maxLength="1"
        />
        <input
          type="text"
          value={code[3]}
          onChange={(e) => handleInputChange(e, 3)}
          maxLength="1"
        />
        <input
          type="text"
          value={code[4]}
          onChange={(e) => handleInputChange(e, 4)}
          maxLength="1"
        />
        </div>
        <div className="buttons-container">
        <button id="submit-code" onClick={handleSendCode}> Verify Code</button>
        <div><p>or</p></div>
        <button id="resend-code" onClick={handleResendCode}> Resend Code</button>
        {
          verified && <Navigate to={`/signin`}> </Navigate> 
        }
        </div>
      </div>
    </>
  )
}

export default VerifyCodeComponent