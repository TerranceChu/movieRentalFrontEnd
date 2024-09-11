import React, { useState, useEffect } from 'react';
import { getPendingChats, acceptChat, getChatById } from '../api/chatApi';
import { List, Button, Input, Typography } from 'antd';
import NavBar from '../components/NavBar';
import socket from '../utils/socket';

const { Title } = Typography;

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

const AdminChatPage = () => {
  const [pendingChats, setPendingChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(JSON.parse(localStorage.getItem('selectedChat') || 'null'));
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
      localStorage.setItem('selectedChat', JSON.stringify(response.data)); // 保存到 localStorage

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
        setSelectedChat((prevChat: any) => {
          const updatedChat = {
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
          };
          localStorage.setItem('selectedChat', JSON.stringify(updatedChat)); // 保存到 localStorage
          return updatedChat;
        });
      });

      return () => {
        socket.off('newMessage'); // 清理 WebSocket 监听器
      };
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!message || !selectedChat) return;

    socket.emit('sendMessage', { chatId: selectedChat._id, message, sender: 'admin' });
    setMessage('');
  };

// 用户手动离开聊天室
const handleLeaveChat = () => {
  if (selectedChat) {
    // 发送关闭聊天室的消息给用户
    socket.emit('sendMessage', { chatId: selectedChat._id, message: 'Chatroom closed please leave', sender: 'system' });

    // 向服务器发送离开房间的事件
    socket.emit('leaveChat', selectedChat._id);

    // 清空 selectedChat 并移除 localStorage 中的记录
    setSelectedChat(null);
    localStorage.removeItem('selectedChat');

    // 刷新页面，防止显示上一聊天室申请
    window.location.reload();
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
          <Button type="default" onClick={handleLeaveChat} style={{ marginTop: '10px' }}>
            Leave Chatroom
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminChatPage;
