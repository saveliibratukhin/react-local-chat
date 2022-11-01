import './Message.css'

export default function Message ({message, isMyMessage}) {
    return (
        <div className={isMyMessage ? "messageContainer myMessage" : "messageContainer" }>
            <div className='senderName'>
                {message.sender}
            </div>
            <div className='messageText'>
                {message.text}
            </div>
            <div className='dateTimeText'>
                {message.dateTime}
            </div>
        </div>
    )
}