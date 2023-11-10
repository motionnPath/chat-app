import React, { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import axios from '../api/axios'
import RecipientContext from '../context/RecipientProvider'
import '../css/firstLayout.css';
import people from '../icons/people.svg'
import person from '../svg/user.svg'

function FirstLayoutComponent() {

    const { recipient, setRecipient } = useContext(RecipientContext);
    const [iconStyle, setIconStyle] = useState({borderBottom:"solid #38BDF8"});
    const [pStyle, setPStyle] = useState({borderBottom:"none"});
    const [activeView, setActiveView] = useState("usersView");
    const [recieverName, setRecieverName] = useState(recipient);
    const [users, setUsers] = useState([])


    
    // to toggle between userView and chatsview
    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.id === "pId"){
            setIconStyle({borderBottom:"none"});
            setPStyle({borderBottom:"solid #38BDF8"});
            setActiveView("chatsView");
        }else {
            setIconStyle({borderBottom:"solid #38BDF8"});
            setPStyle({borderBottom:"none"});
            setActiveView("usersView");
        }
    }
    
    useEffect(()=>{

        const getUsers = async () => {
            const res = await axios.get('/users/')
            setUsers(res.data)
        }
        getUsers()
    },[])
  return (
    <>
        <div className="first-layout-container">
            <div className="banner-container">
                <img 
                    id='people-icon'
                    src={people} 
                    alt="" 
                    key={"people"} 
                    onClick={handleClick} 
                    style={iconStyle}
                    
                />
                <p id='pId' onClick={handleClick} style={pStyle}>Chats</p>
            </div>
            <div className="first-layout-body-container">
                {
                    users.map(user => 
                    <div className="conversation-container" >
                        <Link to={`/private-chat/${(user.username).toString()}`}>
                            <img 
                            id='s'
                            src={user.userphoto || person} 
                            alt="" 
                            onClick={()=> setRecipient(user.username)}/>   
                        </Link>     
                            <div className="flex-right">
                                <div className="flex-right-top">
                                <Link to={`/private-chat/${(user.username).toString()}`}>
                                    <p id="user-name" onClick={()=> setRecipient(user.username)}>{user.username}</p>
                                </Link>
                                    <p id="time-stamp">21.12.22</p>
                                </div>
                                <p id="conversation-snippet">dfdsfhgsdfgjsdgfhj</p>
                            </div>
                        
                    </div>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default FirstLayoutComponent