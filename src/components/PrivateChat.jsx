import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axios'
import '../css/privatechat.css'
import send from "../icons/send.svg"
import socketIOClient from "socket.io-client";
import useAuth  from "../hooks/useAuth"
import RecipientContext from '../context/RecipientProvider';
import profile from '../svg/user.svg'






const  PrivateChat = () => {


  const { auth } = useAuth();
  const { recipient, setRecipient } = useContext(RecipientContext);
  const [msg, setmsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.user);
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [newMessage, setNewMesage]= useState(null)
 

  const handleInputChange = (e) => {
    e.preventDefault();
    setmsg(e.target.value)
  }
  const handleSendMsg = () => {
  
    setNewMesage({ 
      from:currentUser,
      to: recipient, 
      message:msg,
      room_1: `${currentUser}-${recipient}`,
      room_2: `${recipient}-${currentUser}`,
    })
    
    setmsg("");
  };
 

  useEffect(()=>{
    if(newMessage === null) return;
    socket.emit('privateMessage', newMessage);
  },[newMessage])

  useEffect(() => {
    
    if(socket === null) {
      
      return;
    }
    socket.on('getPrivateMessage', (message) => {
      
      setConversation((prevMessages) => [...prevMessages, message]);
      
    });
    
    return () => socket.disconnect()

    
  },[socket,recipient,currentUser]);

  // saving new msg to mongodb


  //join specific room
  useEffect(()=> {
    if(socket === null) return;
    socket.emit("join-room",{room:`${currentUser}-${recipient}`})
  })
  

  

 

  useEffect(() =>{
    if(socket === null) return
    socket.emit('startChat',{username:currentUser}) /// hier was {username:currentUser}
    
  },[socket,currentUser])

  // Load the conversation from MongoDB
  useEffect(() => {

    const getConversation = async () => {
      const res = await axios.get('/conversations/', {
        params : {
          room_1: `${currentUser}-${recipient}`,
          room_2:`${recipient}-${currentUser}`
        }
      })
      if(res){
        setConversation(res.data)
      }
      return;
    }
    getConversation();
  },[])

  useEffect(()=>{
    console.log("auth user =", auth.user)
  })
  

  return (
    <>
      <div className="private-chat-container">
        <div className="who-am-i-talking-to">
            <img 
            id="private-chat-recipient-img" 
            src={profile} 
            alt="" 
            />
            <p id="recipient">{recipient}</p>
        </div>
        <div className="display-msg-container">
          
          <ul>
            
            {
              conversation?.map((message,index) => 
                
                <li 
                key={index} 
                style={{alignSelf:message.from === currentUser?"end":"start"}}>
                  
                  <div className="msg-header">
                  <p id='msg-p1'>{message.from}</p>
                  <p id='msg-p2'>{message.time.toString().split('T')[1].slice(0,5)}</p>
                  </div>
                  <p id='msg-p3'>{message.message}</p>
                  
                </li>
                
              )
            }

            
          </ul>
        </div>
        <div className="input-button-container">
          <input type="text" placeholder='Send a msg' value={msg} onChange={handleInputChange}/>
          <button onClick={handleSendMsg}><img src={send} alt="" key={"bz"}/> </button>
        </div>

      </div>
      
    </>
  )
}

export default PrivateChat