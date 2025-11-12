import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      setMessage(res.data.message);

    // If login was successful, redirect
    if (res.data.message === 'Login successful!') {
      navigate('/dashboard', { state: { username } });// 👈 redirect to your protected route/component
    }
    } catch (err) {
      setMessage('Server error');
    }
  };
    const handleCreateAccount = () => {
    navigate('/createacc');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
       <button 
        onClick={handleCreateAccount} 
        style={{ marginTop: '10px', background: '#4CAF50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Create Account
      </button>
    </div>
  );
}

export default Signin;