import React from 'react';
interface IMessage  {
    displayName: string,
    timestamp: string,
    message: string,
    isCurrentUser: boolean,
  };

const Message : React.FC<IMessage>= ({ displayName, timestamp, message, isCurrentUser }) => {

  return (
    <div className={`message-wrapper ${isCurrentUser ? 'current-user-wrapper' : ''}`}>
      <div className="message-info">
        <span className="displayName">{displayName}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className={`message ${isCurrentUser ? 'current-user' : 'other-user'}`}>
        {message}
      </div>
    </div>
  );
};

export default Message;
