import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios_for_soket from '../api/axios_for_soket'

const ENDPOINT = axios_for_soket;

function ChatComponent() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = socketIOClient(ENDPOINT);
    

    const sendMessage = () => {
        socket.emit('send_message', message);
        setMessage('');
    };

    useEffect(() => {
        socket.on('recieve_message', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          alert(`message recieved ${message}`)
        });
  
        return () => {
        socket.disconnect();
        };
    }, [socket]);
  
    


    return (
        <div>
          <h1>Real-Time Chat</h1>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
    );
  
}

export default ChatComponent