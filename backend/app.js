const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const socketManager = require('./socket/socketManager');
const { normalizePort, onError, onListening } = require('./utils/server-utils');
const { error } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Configuração do Socket.IO
io.on('connection', socketManager);

const PORT = normalizePort(process.env.PORT || 5000);

server.listen(PORT, () => {
  console.log(`Server Socket.IO running on port ${PORT}`);
});

server.on('error', onError);

module.exports = app;
