import { useNavigate, useParams } from "react-router-dom"
import Message from "./Message"
import "./Chat.css"
import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Chat() {
    const [newMessage, setNewMessage] = useState('')
    const [emojiPickerShow, setEmojiPicherShow] = useState(false)
    const [messages, setMessages] = useState([])
    const messagesContainerRef = useRef()

    let params = useParams()
    const username = sessionStorage.getItem('username')
    let navigate = useNavigate()

    if (!username) {
        alert('please enter by username')
        navigate('/')
    }

    const sendMessage = () => {
        setMessages([...messages, {
            id: messages.length,
            sender: username,
            text: newMessage,
            dateTime: new Date().toLocaleString()
        }])
        setNewMessage('')
    }

    //getting data from storagge
    useEffect(() => {
        setMessages(JSON.parse(localStorage.getItem(params.roomId)) || [])

    }, [params])

    //scroll when user send message
    useEffect(() => {
        const scrollToEnd = () => {
            messagesContainerRef.current.scrollTo({top: messagesContainerRef.current.scrollHeight,behavior: 'smooth'})
        }
        scrollToEnd()
    }, [messages])

    //save messages to storage
    useEffect(() => {
        const saveMessages = () => {
            localStorage.setItem(params.roomId, JSON.stringify(messages))
        }

        saveMessages()
    }, [params, messages])

    return (
        <div className="screen">
            <div className="chat">
                <h1>Chat {params.roomId}</h1>
                <div ref={messagesContainerRef} className="messagesContainer">
                    {messages.map(m =>
                        <Message key={m.id} message={m} isMyMessage={m.sender === username}/>
                    )}
                    <div className="emojiPicker">
                        {emojiPickerShow && <EmojiPicker 
                            onEmojiClick={em => {setNewMessage(newMessage + em.emoji); setEmojiPicherShow(false)}}
                        />}
                    </div>
                </div>
                <div className="inputAndIcons">
                    <img 
                        src='https://i.pinimg.com/originals/f2/ae/15/f2ae153238aef25880ac423ece7fb324.png' 
                        onClick={() => setEmojiPicherShow(!emojiPickerShow)}
                        className="icon" 
                    />
                    <input 
                        type='text' 
                        className="messageInput" 
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') 
                                sendMessage()
                        }}
                    />
                    <img 
                        src='https://cdn-icons-png.flaticon.com/512/6492/6492707.png' 
                        onClick={sendMessage}
                        className="icon" 
                    />
                </div>
            </div>
        </div>
    )
}   