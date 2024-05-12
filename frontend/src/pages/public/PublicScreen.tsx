import React from 'react';
import './PublicScreen.css';

interface PublicScreenProps {
  requestSecureScreenAccess: () => void;
}

const PublicScreen: React.FC<PublicScreenProps> = ({ requestSecureScreenAccess }) => {
  return (
    <div className="public-screen-container">
      <h1>Public Screen 🔓</h1>
      <button onClick={requestSecureScreenAccess}>Request Screen Access 🔒</button>
    </div>
  );
};

export default PublicScreen;
