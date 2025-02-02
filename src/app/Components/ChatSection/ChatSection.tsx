import React, { useEffect, useRef, useState } from 'react';
import './ChatSection.scss';
import { IDiscussion } from '@/app/Interfaces/Interfaces';
import Message from '../Message/Message';
import { useAppContext } from '@/app/Context/AppContext';
import { getCurrentTime } from '@/app/Helpers/Helpers';
import * as signalR from '@microsoft/signalr';
import { useSearchParams } from 'next/navigation';
import messagesService from '@/app/Services/messageService';
import { GrSend } from 'react-icons/gr';
import { BsEmojiSmile } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";

interface IChatComponet {
  title: string,
  discussions: IDiscussion
}

const ChatComponent: React.FC<IChatComponet> = ({ title, discussions }) => {

  const [connection, setConnection] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const userContext = useAppContext()[0] as any
  const displayName = userContext?.user?.displayName;
  const [currentMessage, setCurrentMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const groupName = decodeURIComponent(searchParams?.get('groupName') as string)?.toString();
  const messageService = new messagesService();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5234/chathub')  // Adjust the URL if needed
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
    loadPreviousChat();

  }, []);

  const loadPreviousChat = async () => {
    var result = await messageService.getMessages({ id: 0, name: "", practice: userContext?.user?.practice, group: groupName, discussion: title });
    if (result?.value?.length > 0)
      setMessages(result?.value);
  }

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to SignalR server');
          connection.on('ReceiveMessage', (message: any) => {
            console.log(message, "got message")
            setMessages(prevMessages => [...prevMessages, message]);
          });
        })
        .catch((error: any) => console.error('Connection failed:', error));
    }
  }, [connection, messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    debugger;
    const formData = new FormData();

    formData.append("Id", ""); 
    formData.append("DisplayName", displayName);
    formData.append("Text", currentMessage);
    formData.append("Group", groupName);
    formData.append("Discussion", title);
    formData.append("ReplyedTo", "");
    formData.append("Practice",userContext?.user?.practice);
    formData.append("UserName",userContext?.user?.email);

    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("Attachments", file); 
      });
    }
    
    //setMessages([...messages, newMessage]);

    if (connection && formData) {
      setCurrentMessage("");
      await messageService.addMessage(formData);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    if (!e.target.files) return; // Prevent errors if no files are selected
  
    const files = Array.from(e.target.files); // Convert FileList to an array
    setSelectedFiles(files); // Update state with selected files
  };

  return (
    <div className="ps-3 h-100 pe-2">
      {/* <div className='text-lg font-bold m-0'>{title}</div> */}
      <div className='h-100 overflow-y-auto'>
        <div className="chat-container-wrapper">
          <div className="chat-container h-100 overflow-auto" ref={chatContainerRef}>
            {messages.map((message) => (
              <Message {...message} isCurrentUser={message.displayName === displayName} />
            ))}
          </div>

          <div className="chat-input px-2 py-1">
            <span className='cursor-pointer'><BsEmojiSmile /></span>
            <input
              type="text"
              placeholder="Type a message..."
              className="input-box"
              value={currentMessage}
              multiple={true}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className='cursor-pointer'>
              <div className="relative flex flex-col items-center">
                <label className="cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                    id="attachments"
                    multiple  
                    onChange={handleChangeFile}  
                  />
                  <CgAttachment className="text-xl text-gray-600 hover:text-blue-500" />
                </label>
              </div>
            </span>
            <button className="send-button flex items-center" onClick={sendMessage}><span className=''> Send </span> <GrSend className='ms-2' /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;