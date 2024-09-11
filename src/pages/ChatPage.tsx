import React, { useState, useEffect } from 'react';
import { startChat, sendMessage, getChatById } from '../api/chatApi';
import { Input, Button, List, Typography } from 'antd';
import NavBar from '../components/NavBar';

const { Title } = Typography;

const ChatPage = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 发起聊天请求
  const handleStartChat = async () => {
    try {
      const response = await startChat('Hello, I need help');
      setChatId(response.data.chatId);
      setMessages([{ sender: 'user', message: 'Hello, I need help', timestamp: new Date() }]);
    } catch (error) {
      console.error('Failed to start chat', error);
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!message || !chatId) return;

    try {
      await sendMessage(chatId, message);
      setMessages([...messages, { sender: 'user', message, timestamp: new Date() }]);
      setMessage(''); // 清空输入框
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  // 获取聊天详细信息
  const fetchChatDetails = async () => {
    if (!chatId) return;

    try {
      const response = await getChatById(chatId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to fetch chat details', error);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchChatDetails();
    }
  }, [chatId]);

  return (
    <div>
      <NavBar />
      <Title level={2}>Chat with Support</Title>

      {!chatId && (
        <Button type="primary" onClick={handleStartChat} disabled={loading}>
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
