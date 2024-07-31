
import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Add user's message to chat
    const newMessage = { user: 'You', text: message };
    setChat([...chat, newMessage]);
    setMessage('');

    // Send message to Telegram
    try {

      const response = await fetch(
        `https://api.lowcodeapi.com/telegram/bot-token/sendmessage?api_token=at_r485c626*******************`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: '19********',
            text: message,
          }),
        }
      );

      if (response.ok) {
        setChat([...chat, newMessage, { user: 'Bot', text: 'Message sent!' }]);
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-900 text-white text-center py-3 font-bold">
          Chat with Neha 🤍
        </div>
        <div className="p-4 h-[300px] overflow-y-auto bg-gray-800">
          {chat.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.user === 'You' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${msg.user === 'You' ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white'}`}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 p-4 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

