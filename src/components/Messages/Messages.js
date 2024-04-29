import './Messages.scss';
import {MessageHeader, Message} from 'semantic-ui-react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { FormField, Button, Form, FormSelect, FormTextArea, FormCheckbox } from 'semantic-ui-react'

function Messages({matches}) {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const colors = ['green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'black'];
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [messageCount, setMessageCount] = useState({});
//match.stringId from handleThreadClick : response.data.length from fetchMessages

//to set Object for blurry images dpending on messageCount
useEffect(() => {
    const fetchMessageCounts = async () => {
        try {
            const messageCounts = {};
            for (const match of matches) {
                const response = await axios.get(`http://localhost:8080/messages/${currentUser.stringId}/${match.stringId}`, { withCredentials: true });
                messageCounts[match.stringId] = response.data.length;
            }
            setMessageCount(messageCounts);
        } catch (error) {
            console.error("Failed to fetch message counts", error);
        }
    };

    if (currentUser && matches) {
        fetchMessageCounts();
    }
}, [currentUser, matches]);

    const fetchMessages = async (matchId) => {
        try {
            console.log(currentUser)
            const response = await axios.get(`http://localhost:8080/messages/${currentUser.stringId}/${matchId}`, {withCredentials: true});
            console.log(response, "fetchMessages response")
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setMessages([]);
        }
    };

    const handleThreadClick = (match) => {
        console.log(match, "match")
        setSelectedMatch(match);
        fetchMessages(match.stringId);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!messageContent.trim()) return;

        try {
            const response = await axios.post('http://localhost:8080/messages/send', {
                senderId: currentUser.stringId,
                receiverId: selectedMatch.stringId,
                content: messageContent,
                timestamp: ''
            },
                {withCredentials: true});
            setMessages((previousMessages) => [...previousMessages, response.data]);
            setMessageContent('');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };


    return (
        <div className='messages'>
            {!selectedMatch && matches ? (
                matches.map((person, index) => {
                    const colorIndex = index % colors.length;
                    const color = colors[colorIndex];
                    return (
                        <Message
                            color={color}
                            key={index}
                            onClick={() => handleThreadClick(person)}
                            style={{ cursor: 'pointer' }}
                        >
                            <MessageHeader>{person.name}</MessageHeader>
                            <p>Open messages with {person.name}</p>
                        </Message>
                    );
                })
            ) : selectedMatch ? (
                <div className='message-display'>
                    <button onClick={() => setSelectedMatch(null)}>Back to matches</button>
                    <h2>Messages with {selectedMatch.name}</h2>
                    {messages.length ? (
                        messages.map((msg, index) => (
                            <p key={index}>{msg.senderId === currentUser.stringId ? 'You: ' : `${selectedMatch.name}: `}{msg.content}</p>
                        ))
                    ) : (
                        <p>No messages to display</p>
                    )}
                    <form onSubmit={sendMessage}>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Type a message here"
                            required
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            ) : (
                <p>No matches</p>
            )}
        </div>
    );
}

export default Messages;