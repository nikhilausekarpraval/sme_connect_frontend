import React, { useEffect, useRef, useState } from 'react';
import './ChatSection.scss';
import Message from '../Message/Message';
import { useAppContext } from '@/app/Context/AppContext';
import * as signalR from '@microsoft/signalr';
import { useSearchParams } from 'next/navigation';
import messagesService from '@/app/Services/messageService';
import { GrSend } from 'react-icons/gr';
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import FileUpload from '../ChatExample/ChatExample';
import { CiFileOn } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';


interface IChatComponet {
  title: string,
}

const ChatComponent: React.FC<IChatComponet> = ({ title}) => {

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
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileToRemove, setFiletoRemove] = useState("");
  const selectedFilesRef = useRef([]);


  useEffect(() => {
    loadPreviousChat();
  }, [searchParams]); 

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5234/chathub')  
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
    loadPreviousChat();

  }, []);

  const isSelectedRoleAdmin=()=>{
    return   userContext?.user?.roles?.some((role:any)=> role?.name?.toLowerCase() === "admin" );
}

  const getUserPractice=()=>{
   return isSelectedRoleAdmin() ? searchParams?.get("practice") : userContext?.user?.practice;
  }

  const loadPreviousChat = async () => {
    if (!title) return; 
    try {
      const result = await messageService.getMessages({
        id: 0,
        name: "",
        practice: getUserPractice(),
        group: groupName,
        discussion: title,
      });

      if (result?.value?.length > 0) {
        setMessages(result.value);
      } else {
        setMessages([]); 
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connection.on('ReceiveMessage', (message: any) => {
            setMessages(prevMessages => [...prevMessages, message]);  

            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          });
        })
        .catch((error: any) => console.error('Connection failed:', error));
    }
  }, [connection]);  

  // New useEffect for scrolling to bottom when messages update
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);  // Trigger scroll when messages update

  const sendMessage = async () => {

    const formData = new FormData();
    formData.append("Id", "");
    formData.append("DisplayName", displayName);
    formData.append("Text", currentMessage);
    formData.append("Group", groupName);
    formData.append("Discussion", title);
    formData.append("ReplyedTo", "");
    formData.append("Practice", getUserPractice());
    formData.append("UserName", userContext?.user?.email);

    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("Attachments", file);
      });
    }

    if (connection && formData) {
      setCurrentMessage("");  
      await messageService.addMessage(formData);
    }
  
    setSelectedFiles([]);  
    selectedFilesRef.current = [];
    
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    selectedFilesRef.current = Array.from(e.target.files) as any;
  };

  const removeFile = (fileName: string, e: any) => {
    e.preventDefault();
    setFiletoRemove(fileName);
  }


  return (
    <div className=" h-100 pe-2">
      {/* <div className='text-lg font-bold m-0'>{title}</div> */}
      <div className='h-100 overflow-y-auto'>
        <div className="chat-container-wrapper">
          <div className="chat-container h-100 overflow-auto" ref={chatContainerRef}>
            {messages.map((message) => (
              <Message {...message} isCurrentUser={message.displayName === displayName} />
            ))}
          </div>

          <div className="chat-input-section ">
          {selectedFiles?.length > 0 &&
            <div className="flex flex-wrap px-2 pt-2 gap-3">
              {selectedFiles.map((file: any) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 bg-gray-100 border rounded-lg"
                >
                  <CiFileOn size={18} className="text-blue-600" />
                  <span className="text-sm text-gray-700 px-2">{file.name}</span>
                  <button
                    onClick={(e) => removeFile(file.name, e)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded-md"
                  >
                    <RxCross2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          }
            <div className='chat-input px-2 py-1'>
              <span className='cursor-pointer'>
                <BsEmojiSmile onClick={(e) => setShowEmoji(!showEmoji)} />
                <EmojiPicker open={showEmoji} />
              </span>
              <input
                type="text"
                placeholder="Type a message..."
                className="input-box"
                value={currentMessage}
                multiple={true}
                onChange={(e) => setCurrentMessage(e?.target?.value)}
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
                    <FileUpload setSelectedFiles={setSelectedFiles} fileToRemove={fileToRemove} selectedFiles={selectedFiles} />
                    {/* <CgAttachment className="text-xl text-gray-600 hover:text-blue-500" /> */}
                  </label>
                </div>
              </span>
              <div>
            </div>
            <button className="send-button flex items-center" onClick={sendMessage}><span className=''> Send </span> <GrSend className='ms-2' /></button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;