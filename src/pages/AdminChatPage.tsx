import React, { useState, useEffect } from 'react';
import { getPendingChats, acceptChat, getChatById } from '../api/chatApi';
import { List, Button, Input, Typography } from 'antd';
import NavBar from '../components/NavBar';
import io from 'socket.io-client'; // 引入 socket.io-client

const { Title } = Typography;
const socket = io('http://localhost:3000'); // 与 WebSocket 服务器连接

interface Message {
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

      // 加入聊天房间
      socket.emit('joinChat', chatId);
    } catch (error) {
      console.error('Failed to accept chat', error);
    }
  };

  // 监听新消息
  useEffect(() => {
    if (selectedChat) {
      socket.on('newMessage', (newMessage) => {
        setSelectedChat((prevChat: any) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));
      });

      return () => {
        socket.off('newMessage'); // 清理 WebSocket 监听器
      };
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!message || !selectedChat) return;

    // 发送消息通过 WebSocket
    socket.emit('sendMessage', { chatId: selectedChat._id, message, sender: 'admin' });
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, { sender: 'admin', message, timestamp: new Date() }],
    });
    setMessage(''); // 清空输入框
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
            renderItem={(item: Message) => (
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
