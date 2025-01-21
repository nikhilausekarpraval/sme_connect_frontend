import React, { useEffect, useRef, useState } from 'react';
import './ChatSection.scss'; 
import { IDiscussion } from '@/app/Interfaces/Interfaces';
import Message from '../Message/Message';
import { useAppContext } from '@/app/Context/AppContext';
import { getCurrentTime } from '@/app/Helpers/Helpers';
import * as signalR from '@microsoft/signalr';
import { useSearchParams } from 'next/navigation';
import messagesService from '@/app/Services/messageService';

interface IChatComponet{
    title:string,
    discussions:IDiscussion
}

const ChatComponent : React.FC<IChatComponet>= ({title,discussions}) => {

      const [connection, setConnection] = useState<any>(null);
      const [messages, setMessages] = useState<any[]>([]);
      const userContext = useAppContext()[0] as any
      const displayName = userContext?.user?.displayName;
      const [currentMessage,setCurrentMessage] = useState("");
      const chatContainerRef = useRef<HTMLDivElement | null>(null);
      const searchParams = useSearchParams();
      const groupName = searchParams?.get('groupName');
      const messageService = new messagesService();

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
                  console.log(message,"got message")
                  setMessages(prevMessages => [...prevMessages,  message ]);
                });
              })
              .catch((error:any) => console.error('Connection failed:', error));
          }
        }, [connection]);

        useEffect(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, [messages]); 
      
        const sendMessage = async () => {
          const newMessage = {
            id: null, 
            displayName: displayName,
            createdDate: new Date(),
            text: currentMessage,
            groupName: groupName,
            discussion: title,
            replyedTo: "",
            practice: userContext?.user?.practice,
            userName: userContext?.user?.email,
            attachments: [] // Adjust if you handle file uploads
          };
        
          //setMessages([...messages, newMessage]);
          
          if (connection && newMessage) {
            
            await messageService.addMessage(newMessage);  
            setCurrentMessage("");
          }
        };
        
      
    return (
        <div className="ps-3 h-100 pe-2">
            {/* <div className='text-lg font-bold m-0'>{title}</div> */}
            <div className='h-100 overflow-y-auto'>
                <div className="chat-container-wrapper">
                    <div className="chat-container h-100 overflow-auto" ref={chatContainerRef}>
                        {messages.map((message)=>(
                            <Message {...message} isCurrentUser={message.displayName === displayName} />
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="input-box"
                            value={currentMessage}
                            onChange={(e)=>setCurrentMessage(e.target.value)}
                        />
                        <button className="send-button" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;