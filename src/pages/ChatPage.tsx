import React, { useState, useEffect } from 'react';
import { startChat } from '../api/chatApi';
import { Input, Button, List, Typography } from 'antd';
import NavBar from '../components/NavBar';
import socket from '../utils/socket';

const { Title } = Typography;

const ChatPage = () => {
  const [chatId, setChatId] = useState<string | null>(localStorage.getItem('chatId'));
  const [messages, setMessages] = useState<any[]>(JSON.parse(localStorage.getItem('messages') || '[]'));
  const [message, setMessage] = useState<string>('');

  // 发起聊天请求
  const handleStartChat = async () => {
    try {
      const response = await startChat('Hello, I need help');
      const newChatId = response.data.chatId;
      setChatId(newChatId);
      const initialMessages = [{ sender: 'user', message: 'Hello, I need help', timestamp: new Date() }];
      setMessages(initialMessages);
      
      // 保存到 localStorage
      localStorage.setItem('chatId', newChatId);
      localStorage.setItem('messages', JSON.stringify(initialMessages));

      // 加入聊天房间
      socket.emit('joinChat', newChatId);
    } catch (error) {
      console.error('Failed to start chat', error);
    }
  };

  // 监听新消息
  useEffect(() => {
    if (chatId) {
      socket.emit('joinChat', chatId); // 加入指定聊天房间

      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          localStorage.setItem('messages', JSON.stringify(updatedMessages)); // 保存到 localStorage
          return updatedMessages;
        });
      });

      return () => {
        socket.off('newMessage'); // 清理 WebSocket 监听器
      };
    }
  }, [chatId]);

  // 发送消息
  const handleSendMessage = () => {
    if (!message || !chatId) return;

    socket.emit('sendMessage', { chatId, message, sender: 'user' });
    setMessage(''); // 清空输入框
  };

  // 用户手动离开聊天室
  const handleLeaveChat = () => {
    if (chatId) {
      // 发送关闭聊天室的消息给另一方
      socket.emit('sendMessage', { chatId, message: 'Chatroom closed please leave', sender: 'system' });

      socket.emit('leaveChat', chatId); // 向服务器发送离开房间的事件
      setChatId(null);
      setMessages([]);
      localStorage.removeItem('chatId');
      localStorage.removeItem('messages');
    }
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
                  title={item.sender === 'user' ? 'You' : item.sender === 'admin' ? 'Admin' : 'System'}
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
          <Button type="default" onClick={handleLeaveChat} style={{ marginTop: '10px' }}>
            Leave Chatroom
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
