// src/utils/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // 创建一个 socket 实例，连接至服务器

export default socket;
