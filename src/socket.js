// src/socket.js
import { io } from 'socket.io-client';

// let socket;

// export const getSocket = () => {
//   return io(SOCKET_URL, {
//     transports: ['websocket'], 
//   });
// };

export const getSocket = () => {
  // let socket = io('wss://random-face-backend.vercel.app'}); // URL of your server
  // let socket = io('http://localhost:3001'); // URL of your server
  let socket = io('https://random-face-backend.vercel.app',{
    transports: ['websocket'],
  }); // URL of your server
  return socket;
};