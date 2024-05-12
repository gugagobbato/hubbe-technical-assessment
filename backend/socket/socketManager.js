let isScreenLocked = false;
let secureScreenSocket = null;
let awaitingScreenSockets = [];

function handleSecureScreenAccessRequest(socket) {
  if (isScreenLocked && secureScreenSocket === socket) {
    console.log(`Client ${socket.id} already has screen access`);
    return;
  }

  if (!isScreenLocked) {
    grantSecureScreenAccess(socket);
  } else {
    denySecureScreenAccess(socket);
  }
}

function grantSecureScreenAccess(socket) {
  if (secureScreenSocket) {
    secureScreenSocket.emit('screenAccessRevoked');
    secureScreenSocket = null;
  }

  if (awaitingScreenSockets.length > 0) {
    const nextSocket = awaitingScreenSockets.shift();
    secureScreenSocket = nextSocket;
    console.log(`Client ${nextSocket.id} has access to screen`);
    emitAwaitingScreenPosition();
  } else {
    secureScreenSocket = socket;
    console.log(`Client ${socket.id} has access to screen`);
  }

  isScreenLocked = true;
  socket.emit('screenAccessGranted');
}

function denySecureScreenAccess(socket) {
  if (awaitingScreenSockets.includes(socket)) {
    console.log(`Client ${socket.id} already requested screen access`);
    return;
  }

  awaitingScreenSockets.push(socket);
  socket.emit('screenAccessDenied', awaitingScreenSockets.length);
  console.log(`Client ${socket.id} was denied access to screen`);
}

function handleLeaveAwaiting(socket) {
  const index = awaitingScreenSockets.indexOf(socket);
  if (index !== -1) {
    awaitingScreenSockets.splice(index, 1);
    console.log(`Client ${socket.id} left awaiting screen access`);
  }

  emitAwaitingScreenPosition();
}

function handleLeaveSecureScreen(socket) {
  if (secureScreenSocket === socket) {
    isScreenLocked = false;
    secureScreenSocket = null;
    console.log(`Client ${socket.id} left screen`);

    const nextSocket = awaitingScreenSockets.shift();
    if (nextSocket) {
      secureScreenSocket = nextSocket;
      console.log(`Client ${nextSocket.id} has access to screen`);
      nextSocket.emit('screenAccessGranted');
    }
  }

  emitAwaitingScreenPosition();
}

function handleDisconnect(socket) {
  console.log(`Client disconnected: ${socket.id}`);

  if (secureScreenSocket === socket) {
    handleLeaveSecureScreen(socket);
  } else if (awaitingScreenSockets.includes(socket)) {
    handleLeaveAwaiting(socket);
  } else {
    console.log(`Client ${socket.id} was not in any screen state`);
  }
}

function emitAwaitingScreenPosition() {
  awaitingScreenSockets.forEach((socket, index) => {
    socket.emit('screenAccessDenied', index + 1);
  });
}

module.exports = function (socket) {
  console.log(`Client connected: ${socket.id}`);

  socket.on('requestSecureScreenAccess', () => handleSecureScreenAccessRequest(socket));
  socket.on('leaveAwaitingScreen', () => handleLeaveAwaiting(socket));
  socket.on('leaveScreen', () => handleLeaveSecureScreen(socket));
  socket.on('disconnect', () => handleDisconnect(socket));
};

