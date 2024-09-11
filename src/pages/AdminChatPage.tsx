import React, { useState, useEffect } from 'react';
import { getPendingChats, acceptChat, getChatById, sendMessage } from '../api/chatApi';
import { List, Button, Input, Typography } from 'antd';
import NavBar from '../components/NavBar';

const { Title } = Typography;
interface Message {
  sender: string;
  message: string;
  timestamp: string;
}interface Message {
    sender: string;
    message: string;
    timestamp: string;
  }
const AdminChatPage = () => {
  const [pendingChats, setPendingChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchPendingChats = async () => {
      try {
        const response = await getPendingChats();
        setPendingChats(response.data);
      } catch (error) {
        console.error('Failed to fetch pending chats', error);
      }
    };

    fetchPendingChats();
  }, []);

  const handleAcceptChat = async (chatId: string) => {
    try {
      await acceptChat(chatId);
      const response = await getChatById(chatId);
      setSelectedChat(response.data);
    } catch (error) {
      console.error('Failed to accept chat', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message || !selectedChat) return;

    try {
      await sendMessage(selectedChat._id, message);
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, { sender: 'admin', message, timestamp: new Date() }],
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Title level={2}>Admin Chat</Title>

      {!selectedChat ? (
        <List
          dataSource={pendingChats}
          renderItem={(chat) => (
            <List.Item actions={[<Button onClick={() => handleAcceptChat(chat._id)}>Accept Chat</Button>]}>
              <List.Item.Meta title={`Chat from User ID: ${chat.userId}`} description="Pending" />
            </List.Item>
          )}
        />
      ) : (
        <div>
          <List
  dataSource={selectedChat.messages}
  renderItem={(item: Message) => (  // 为 item 明确类型
    <List.Item>
      <List.Item.Meta
        title={item.sender === 'admin' ? 'You' : 'User'}
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

export default AdminChatPage;
