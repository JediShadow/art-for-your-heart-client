import "./Messages.scss";
import {
	MessageHeader,
	Message,
	Icon,
	MessageContent,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultuser from "../../assets/default.jpg";

function Messages({ matches }) {
	const [selectedMatch, setSelectedMatch] = useState(null);
	const [messages, setMessages] = useState([]);
	const [messageContent, setMessageContent] = useState("");
	const colors = [
		"green",
		"teal",
		"blue",
		"violet",
		"purple",
		"pink",
		"brown",
		"black",
	];
	const currentUser = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (selectedMatch) {
			fetchMessages(selectedMatch.stringId);
		}
	}, [selectedMatch]);

	const fetchMessages = async (matchId) => {
		try {
			console.log(currentUser);
			const response = await axios.get(
				`http://localhost:8080/messages/${currentUser.stringId}/${matchId}`,
				{ withCredentials: true }
			);
			console.log(response, "fetchMessages response");
			setMessages(response.data);
		} catch (error) {
			console.error("Failed to fetch messages", error);
			setMessages([]);
		}
	};

	const handleThreadClick = (match) => {
		console.log(match, "match");
		setSelectedMatch(match);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		if (!messageContent.trim()) return;

		try {
			const response = await axios.post(
				"http://localhost:8080/messages/send",
				{
					senderId: currentUser.stringId,
					receiverId: selectedMatch.stringId,
					content: messageContent,
					timestamp: "",
				},
				{ withCredentials: true }
			);
			setMessages((previousMessages) => [
				...previousMessages,
				response.data,
			]);
			setMessageContent("");
		} catch (error) {
			console.error("Failed to send message", error);
		}
	};

	return (
		<div className="messages">
			<div className="title-flex">
				<h1>MESSAGES</h1>
			</div>
			{!selectedMatch && matches ? (
				matches.map((person, index) => {
					const colorIndex = index % colors.length;
					const color = colors[colorIndex];
					return (
                        <div className="flex-center">
						<Message
							icon
							color='white'
							key={index}
							onClick={() => handleThreadClick(person)}
							style={{ cursor: "pointer" }}
						>
							<img className="user-icon"src={person.artPhotos[0]}></img>
							<MessageHeader>{person.name}</MessageHeader>
							<MessageContent>
								Open messages with {person.name}
							</MessageContent>
						</Message>
                        </div>
					);
				})
			) : selectedMatch ? (
				<div className="message-display">
					<button onClick={() => setSelectedMatch(null)}>
						Back to matches
					</button>
					<h2>Messages with {selectedMatch.name}</h2>
					{messages.length ? (
						messages.map((msg, index) => (
							<p key={index}>
								{msg.senderId === currentUser.stringId
									? "You: "
									: `${selectedMatch.name}: `}
								{msg.content}
							</p>
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
