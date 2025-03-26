import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");
        try {
            const res = await axios.post("http://localhost:8081/api/chat", { prompt: input }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const botMessage = { text: res.data, sender: "bot" };
            setMessages([...messages, userMessage, botMessage]);
        }

        catch (error) {
            console.error("Error sending message:", error);
            sendMessage([...messages, userMessage, { text: "Sorry, I am not able to respond to that.", sender: "bot" }]);
        }
    };
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h4>Deva's Chatbot</h4>
                </div>
                <div className="card-body chat-box" style={{
                    height: "400px"
                    , overflowY: "auto"
                }}>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <div className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                                <div className={`p-3 rounded shadow ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default ChatBot;