import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = ({ id, messages, sendMessage, closeChatBox, handleFileUpload }) => {
  /*  Use State hook to set input variable */
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };
  
  /* Message send by chat boxes get add in the message object defined in app.js file */
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      sendMessage(id, inputValue, file);
      setInputValue('');
      setFile(null);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        <span>Chat Box {id}</span>
        <button className="close-btn" onClick={() => closeChatBox(id)}>
          Close
        </button>
      </div>
      <div className="chat-box-body">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === id ? 'self' : 'other'}`}>
            <span>{message.text}</span>
            {message.file && (
              <a href={message.file} download>
                Download File
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="chat-box-footer">
        <textarea
          className="message-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <input type="file" className="file-btn" onChange={handleFileChange} />
        <button className="send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
