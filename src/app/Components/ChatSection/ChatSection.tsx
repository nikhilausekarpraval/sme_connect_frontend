import React, { useState } from 'react';
import './ChatSection.scss'; 
import { IDiscussion } from '@/app/Interfaces/Interfaces';
import Message from '../Message/Message';
import { useAppContext } from '@/app/Context/AppContext';


interface IChatComponet{
    title:string,
    discussions:IDiscussion
}

const ChatComponent : React.FC<IChatComponet>= ({title,discussions}) => {

      const userContext = useAppContext()[0] as any
     
      const displayName = userContext?.user?.displayName;

    const messages = [
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
          displayName: "Nikhil Ausekar",
          timestamp: "11:19 AM",
          message: "You're welcome!",
        },        {
            id: 3,
            displayName: "Sai Chandana Konanki",
            timestamp: "11:18 AM",
            message: "Got it, thank you!",
          },
          {
            id: 4,
            displayName: "Nikhil Ausekar",
            timestamp: "11:19 AM",
            message: "You're welcome!",
          }
      ];
      

   const [currentMessage,setCurrentMessage] = useState("");

   function sendMessage(){
        // logic to send message to signalR

        messages

        setCurrentMessage("");
    }

    return (
        <div className="px-3 h-100">
            <div className='text-lg font-bold m-0'>{title}</div>
            <div className='h-100 overflow-y-auto'>
                <div className="chat-container-wrapper">
                    <div className="chat-container h-100 overflow-auto">
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