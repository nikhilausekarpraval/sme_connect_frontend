import React, { useEffect, useRef, useState } from 'react';
import './ChatSection.scss'; 
import { IDiscussion } from '@/app/Interfaces/Interfaces';
import Message from '../Message/Message';
import { useAppContext } from '@/app/Context/AppContext';
import { getCurrentTime } from '@/app/Helpers/Helpers';


interface IChatComponet{
    title:string,
    discussions:IDiscussion
}

const ChatComponent : React.FC<IChatComponet>= ({title,discussions}) => {

      const userContext = useAppContext()[0] as any
     
      const displayName = userContext?.user?.displayName;

    const tempMessages = [
        {
          id: 1,
          displayName: "Sai Chandana Konanki",
          timestamp: "11:16 AM",
          message: "What is the column name?",
        },
        {
          id: 2,
          displayName: "Nikhil Ausekar",
          timestamp: "11:17 AM",
          message: "The column name is 'user_id'.",
        },
        {
          id: 3,
          displayName: "Sai Chandana Konanki",
          timestamp: "11:18 AM",
          message: "Got it, thank you!",
        },
        {
          id: 4,
          displayName: "Uday Ganesuni",
          timestamp: "11:19 AM",
          message: "Hi Nikhil, What's update on task?",
        },        {
            id: 3,
            displayName: "Nikhil Ausekar",
            timestamp: "11:18 AM",
            message: "It's done uday, Raising PR",
          },
          {
            id: 4,
            displayName: "Uday Ganesuni",
            timestamp: "11:19 AM",
            message: "Ok, Let me know after it's done.",
          }
      ];
      

   const [currentMessage,setCurrentMessage] = useState("");

   const [messages,setMessages] = useState(tempMessages);

   function updateResponses(){
            // write signla r logic here to update the message response from the other members
   }

   function sendMessage() {

    const newMessage = {
      id: messages.length + 1, 
      displayName: displayName,
      timestamp: getCurrentTime(),
      message: currentMessage,
    };
  
    setMessages([...messages, newMessage]);
  
    setCurrentMessage("");
  }

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); 

    return (
        <div className="ps-3 h-100 pe-2">
            <div className='text-lg font-bold m-0'>{title}</div>
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