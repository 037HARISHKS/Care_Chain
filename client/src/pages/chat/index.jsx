import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, TextInput, Button, Avatar } from 'flowbite-react';
import { io } from 'socket.io-client';

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:5000');

    // Listen for incoming messages
    socketRef.current.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Fetch conversations
    setConversations([
      {
        id: 1,
        name: "Dr. Jane Smith",
        role: "doctor",
        lastMessage: "See you tomorrow!",
        unread: 2
      },
      // Add more conversations...
    ]);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      sender: user.id,
      receiver: selectedChat.id,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit('message', message);
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar rounded />
                  <div className="flex-1">
                    <p className="font-semibold">{chat.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-8 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar rounded />
                  <div>
                    <p className="font-semibold">{selectedChat.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedChat.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === user.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === user.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <TextInput
                    className="flex-1"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit">Send</Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat; 