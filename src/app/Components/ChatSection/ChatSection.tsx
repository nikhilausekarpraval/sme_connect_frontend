import React from 'react';
import './ChatSection.scss'; 
import { IDiscussion } from '@/app/Interfaces/Interfaces';


interface IChatComponet{
    title:string,
    discussions:IDiscussion
}

const ChatComponent : React.FC<IChatComponet>= ({title,discussions}) => {
    return (
        <div className="px-3 discussion-height">
            <div className='text-lg font-bold m-0'>{title}</div>
            <div className='flex flex-1 flex-col comment-section-height overflow-y-auto'>
                <div className="chat-container-wrapper">
                    <div className="chat-container">

                        {/* Message from another user */}
                        <div className="message-wrapper">
                            <div className="message-info">
                                <span className="username">Sai Chandana Konanki</span>
                                <span className="timestamp">11:16</span>
                            </div>
                            <div className="message other-user">
                                What is the column name?
                            </div>
                        </div>

                        {/* Message from the current user */}
                        <div className="message-wrapper current-user-wrapper">
                            <div className="message-info">
                                <span className="timestamp">11:18</span>
                            </div>
                            <div className="message current-user">
                                It’s `ColumnID`.
                            </div>
                        </div>
                    </div>

                    {/* Chat input section */}
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="input-box"
                        />
                        <button className="send-button">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;