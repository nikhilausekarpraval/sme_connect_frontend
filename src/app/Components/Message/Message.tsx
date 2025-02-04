import { downloadFile, getCurrentTime } from "@/app/Helpers/Helpers";
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";


interface IMessage {
  displayName: string;
  createdDate: Date;
  text: string;
  attachments: { fileName: string; contentType: string, content: string }[];
  isCurrentUser: boolean;
}

const Message: React.FC<IMessage> = ({
  displayName,
  createdDate,
  text,
  attachments,
  isCurrentUser,
}) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
          setMenuOpen(null);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  const handleDownloadFile = (fileName: string, content: string, contentType: string) => {
    downloadFile(fileName, content, contentType);
    setMenuOpen("");
  };

  return (
    <div ref={messageRef}  className={`message-wrapper ${isCurrentUser ? "current-user-wrapper" : ""}`}>
      <div className="message-info">
        <span className="displayName">{displayName}</span>
        <span className="timestamp">{getCurrentTime(createdDate)}</span>
      </div>

      <div className={`message ${isCurrentUser ? "current-user" : "other-user"}`}>
        {text}

        {attachments.length > 0 && (
          <div className="attachments-container flex gap-3 mt-2">
            {attachments.map((file, index) => (
              <div key={index} className="attachment-item relative flex items-center bg-white p-2 rounded-md">
                <span className="text-sm text-gray-700">{file.fileName}</span>

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === file.fileName ? null : file.fileName)}
                    className="p-1 ml-2 hover:bg-gray-300 rounded-md"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {menuOpen === file.fileName && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                        onClick={() => handleDownloadFile(file.fileName, file.content, file.contentType)}
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
