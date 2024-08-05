import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.location.origin}/api/users/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className='login-container'>
      <h2>Assignment for Quadiro Technologies - Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
