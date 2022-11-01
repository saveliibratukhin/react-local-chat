import { useState } from 'react'
import './Enter.css'
import { useNavigate } from 'react-router-dom'

export default function Enter() {
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate()

    const enterButtonClick = () => {
        if (!roomId || !username)
            alert('Enter all the  fields')
        else {
            navigate(`/chats/${roomId}`)
            sessionStorage.setItem('username', username)
        }
    }

    return (
        <div className='modalFullScreen'>
            <div className='modal'>
                <h1>Enter room and username</h1>
                <input 
                    autoFocus={true}
                    type='text' 
                    placeholder='Room' 
                    value={roomId} 
                    onChange={e => setRoomId(e.target.value) }
                />
                <input 
                    type='text' 
                    placeholder='Username' 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    onKeyDown={e => {if (e.key === 'Enter')
                        enterButtonClick()
                    }}
                />
                <button onClick={enterButtonClick}>Enter the room</button>
            </div>
        </div>
    )
}