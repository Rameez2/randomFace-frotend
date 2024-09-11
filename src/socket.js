// src/socket.js
import { io } from 'socket.io-client';

// let socket;

// export const getSocket = () => {
//   if (!socket) {
//     socket = io('http://localhost:3001'); // URL of your server
//   }
//   return socket;
// };

export const getSocket = () => {
  // let socket = io('http://localhost:3001'); // URL of your server
  let socket = io('https://random-face-backend.vercel.app/'); // URL of your server
  return socket;
};