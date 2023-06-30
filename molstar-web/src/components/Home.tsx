import React from 'react';
import MolstarContainer from './MolstarContainer';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <div><MolstarContainer url="..." /></div>
       {/* Replace '...' with the actual URL */}
    </div>
  );
};

export default Home;
