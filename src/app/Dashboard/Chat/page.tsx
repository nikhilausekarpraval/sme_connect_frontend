"use client";

import { getSocket } from '@/config/socket';
import { useEffect, useMemo, useState } from 'react';
import { GrSend } from "react-icons/gr";
import './page.scss';

export default function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  const socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit('sendMessage', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <h1>Chat</h1>
      <div className='mb-2'>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className='message-input-style'
        />
        <button className="btn-primary send-button-style" onClick={sendMessage} >
          Send <span className='ps-2'><GrSend /></span>
        </button>
      </div>
      <div className='received-message-section'>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
