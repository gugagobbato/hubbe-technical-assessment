const DEFAULT_PORT = 5000;
const DEFAULT_HOST = 'http://localhost';
const DEFAULT_TIMEOUT = 200;

const io = require('socket.io-client');

describe('Screen Access Manager', () => {
  let socket;
  let auxiliarySocket;

  beforeEach(() => {
    socket = io.connect(`${DEFAULT_HOST}:${DEFAULT_PORT}`);
    auxiliarySocket = io.connect(`${DEFAULT_HOST}:${DEFAULT_PORT}`);
  });

  afterEach(() => {
    if (socket.connected) socket.disconnect();
    if (auxiliarySocket.connected) auxiliarySocket.disconnect();
  });

  test('Client requests secure screen access when screen is not locked', async () => {
    auxiliarySocket.disconnect();
    let screenAccessGrantedEmitted = false;
    socket.on('screenAccessGranted', () => {
      screenAccessGrantedEmitted = true;
    });
    socket.emit('requestSecureScreenAccess');
    await new Promise(resolve => setTimeout(resolve, DEFAULT_TIMEOUT));
    expect(screenAccessGrantedEmitted).toBe(true);
  });

  test('Client requests secure screen access when screen is locked', async () => {
    let screenAccessGrantedEmitted = false;
    let hasScreenAccessQueuePosition = false;
    auxiliarySocket.on('screenAccessGranted', () => {
      screenAccessGrantedEmitted = true;
    });
    socket.on('screenAccessDenied', position => {
      hasScreenAccessQueuePosition = position !== undefined;
    });
    auxiliarySocket.emit('requestSecureScreenAccess');
    await new Promise(resolve => setTimeout(resolve, DEFAULT_TIMEOUT));
    socket.emit('requestSecureScreenAccess');
    await new Promise(resolve => setTimeout(resolve, DEFAULT_TIMEOUT));
    expect(screenAccessGrantedEmitted).toBe(true);
    expect(hasScreenAccessQueuePosition).toBe(true);
  });

  test('Client leaves secure screen', async () => {
    let leaveScreenConfirmed = false;
    auxiliarySocket.on('screenAccessGranted', () => {
      leaveScreenConfirmed = true;
    });
    socket.emit('requestSecureScreenAccess');
    auxiliarySocket.emit('requestSecureScreenAccess');
    socket.emit('leaveScreen');
    await new Promise(resolve => setTimeout(resolve, DEFAULT_TIMEOUT));
    expect(leaveScreenConfirmed).toBe(true);
  });
});
