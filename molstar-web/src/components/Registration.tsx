import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

interface RegistrationProps {
  onRegister: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Create a user object
    const user = {
      username,
      password
    };

    try {
      // Send a POST request to the registration endpoint
      // Handle registration logic here (commented out for demonstration purposes)
      onRegister();
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
