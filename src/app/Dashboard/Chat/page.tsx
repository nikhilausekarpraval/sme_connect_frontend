"use client";

import { getSocket } from '@/config/socket';
import { useEffect, useMemo, useState } from 'react';

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
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Chat</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '80%', padding: '8px', marginRight: '5px' }}
        />
        <button className="btn-primary" onClick={sendMessage} style={{ padding: '8px 12px' }}>
          Send
        </button>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
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
