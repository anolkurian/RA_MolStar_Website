import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registeration from './components/Registration';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      {/* <div style={{ paddingTop: '60px' }}> */}
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registeration onRegister={handleLogout} />} />
      </Routes>
      {/* </div> */}
    </div>
  );
};

export default App;
