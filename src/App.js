import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

const App = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const addChatBox = () => {
    const id = chatBoxes.length + 1;
    const newChatBoxes = [...chatBoxes, { id, messages: [] }];
    setChatBoxes(newChatBoxes);
  };

  const sendMessage = (chatBoxId, messageText, file) => {
    const newMessage = { sender: chatBoxId, text: messageText, file: null };

    if (file) {
      const fileURL = URL.createObjectURL(file);
      newMessage.file = fileURL;
    }

    const updatedChatBoxes = chatBoxes.map((chatBox) => {
      const updatedMessages = [...chatBox.messages, newMessage];
      return { ...chatBox, messages: updatedMessages };
    });
    setChatBoxes(updatedChatBoxes);
  };

  const closeChatBox = (chatBoxId) => {
    const updatedChatBoxes = chatBoxes.filter((chatBox) => chatBox.id !== chatBoxId);
    setChatBoxes(updatedChatBoxes);
  };

  return (
    <div className="app">
      <button className="add-btn" onClick={addChatBox}>
        Add Chat Box
      </button>
      <div className="chat-boxes">
        {chatBoxes.map((chatBox) => (
          <ChatBox
            key={chatBox.id}
            id={chatBox.id}
            messages={chatBox.messages}
            sendMessage={sendMessage}
            closeChatBox={closeChatBox}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
