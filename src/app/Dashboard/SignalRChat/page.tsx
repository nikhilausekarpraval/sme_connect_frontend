'use client'

import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const ChatComponent = () => {
  const [connection, setConnection] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5234/chathub')  // Adjust the URL if needed
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to SignalR server');
          connection.on('ReceiveMessage', (message:any) => {
            //setMessages(prevMessages => [...prevMessages, { message }]);
          });
        })
        .catch((error:any) => console.error('Connection failed:', error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection && message && user) {
      await connection.invoke('SendMessage', {Text:message});
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}: </strong>{msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
