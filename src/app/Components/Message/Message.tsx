import { getCurrentTime } from '@/app/Helpers/Helpers';
import React from 'react';
interface IMessage  {
    displayName: string,
    createdDate: Date,
    text: string,
    attachments:any[],
    isCurrentUser: boolean,
  };

const Message : React.FC<IMessage>= ({ displayName, createdDate, text, isCurrentUser }) => {

  return (
    <div className={`message-wrapper ${isCurrentUser ? 'current-user-wrapper' : ''}`}>
      <div className="message-info">
        <span className="displayName">{displayName}</span>
        <span className="timestamp">{getCurrentTime(createdDate)}</span>
      </div>
      <div className={`message ${isCurrentUser ? 'current-user' : 'other-user'}`}>
        {text}
      </div>
    </div>
  );
};

export default Message;
