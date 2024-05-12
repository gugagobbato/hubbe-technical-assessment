import React from 'react';
import './AwaitScreen.css';

interface AwaitScreenProps {
  positionInQueue: number;
}

const AwaitScreen: React.FC<AwaitScreenProps> = ({ positionInQueue }: AwaitScreenProps) => {
  return (
    <div className="await-screen-container">
      <h1>Await Screen ⏳</h1>
      <p>You are in position {positionInQueue} in the queue.</p>
      <iframe
        title="Dino Game"
        src="https://offline-dino-game.firebaseapp.com/"
      ></iframe>
    </div>
  );
};

export default AwaitScreen;
