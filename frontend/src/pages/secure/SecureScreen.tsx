import React from 'react';
import './SecureScreen.css';

interface SecureScreenProps {
  leaveScreen: () => void;
}

const SecureScreen: React.FC<SecureScreenProps> = ({ leaveScreen }) => {
  return (
    <div className='secure-screen-container'>
      <h1>Secure Screen 🔒</h1>
      <p>This screen is accessible to only one user at a time. 👀</p>
      <p>Click the button below to leave the screen.😉</p>
      <button onClick={leaveScreen}>Leave Screen ⬅️</button>
    </div>
  );
};

export default SecureScreen;
