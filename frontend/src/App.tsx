// frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import './App.css';
import Header from './components/header/Header';
import AwaitScreen from './pages/await/AwaitScreen';
import PublicScreen from './pages/public/PublicScreen';
import SecureScreen from './pages/secure/SecureScreen';

const ENDPOINT = 'http://localhost:5000';
const socket = socketIOClient(ENDPOINT);

const App: React.FC = () => {
  const [isScreenAccessGranted, setIsScreenAccessGranted] = useState(false);
  const [positionInQueue, setPositionInQueue] = useState(0);

  const requestSecureScreenAccess = () => {
    socket.emit('requestSecureScreenAccess');
  };

  const leaveScreen = () => {
    socket.emit('leaveScreen');
    setPositionInQueue(0);
    setIsScreenAccessGranted(false);
  };

  useEffect(() => {
    socket.on('screenAccessGranted', () => {
      alert('Screen access granted. You will be redirected to the secure screen.');
      setIsScreenAccessGranted(true);
    });

    socket.on('screenAccessDenied', (position) => {
      alert(`Screen access denied. You are in position ${position} in the queue.`);
      setPositionInQueue(position);
    });

    socket.on('connect_error', () => {
      alert('Connection to the server failed. Please try again later.');
    });

    return () => {
      socket.off('screenAccessGranted');
      socket.off('screenAccessDenied');
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            isScreenAccessGranted ?
              <SecureScreen leaveScreen={leaveScreen} /> :
              !positionInQueue ?
                <PublicScreen requestSecureScreenAccess={requestSecureScreenAccess} /> :
                <AwaitScreen positionInQueue={positionInQueue} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;