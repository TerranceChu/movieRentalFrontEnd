import React, { useState, useEffect } from 'react';
import { startChat } from '../api/chatApi';
import { Input, Button, List, Typography } from 'antd';
import NavBar from '../components/NavBar';
import io from 'socket.io-client'; // 引入 socket.io-client

const { Title } = Typography;
const socket = io('http://localhost:3000'); // 与 WebSocket 服务器连接

const ChatPage = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  // 发起聊天请求
  const handleStartChat = async () => {
    try {
      const response = await startChat('Hello, I need help');
      setChatId(response.data.chatId);
      setMessages([{ sender: 'user', message: 'Hello, I need help', timestamp: new Date() }]);
      
      // 加入聊天房间
      socket.emit('joinChat', response.data.chatId);
    } catch (error) {
      console.error('Failed to start chat', error);
    }
  };

  // 监听新消息
  useEffect(() => {
    if (chatId) {
      socket.emit('joinChat', chatId); // 加入指定聊天房间

      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('newMessage'); // 清理 WebSocket 监听器
      };
    }
  }, [chatId]);

  // 发送消息
  const handleSendMessage = () => {
    if (!message || !chatId) return;

    // 发送消息通过 WebSocket
    socket.emit('sendMessage', { chatId, message, sender: 'user' });
    //setMessages([...messages, { sender: 'user', message, timestamp: new Date() }]);
    setMessage(''); // 清空输入框
  };

  return (
    <div>
      <NavBar />
      <Title level={2}>Chat with Support</Title>

      {!chatId && (
        <Button type="primary" onClick={handleStartChat}>
          Start Chat
        </Button>
      )}

      {chatId && (
        <div>
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.sender === 'user' ? 'You' : 'Admin'}
                  description={`${item.message} - ${new Date(item.timestamp).toLocaleString()}`}
                />
              </List.Item>
            )}
          />
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
