import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${window.location.origin}/api/users/register`, { username, password, isAdmin });
      alert('Registration successful. You can now log in.');
      window.location.href = isAdmin ? '/admin-login' : '/user-login';
    } catch (err) {
      alert('Registration failed');
    }
  };

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/admin-login'); 
  };
  const handleClick2 = () => {
    navigate('/user-login'); 
  };

  return (
    <div className='login-container'>
      <h2>Assignment for Quadiro Technologies - Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          Register as Admin
        </label>
        <button type="submit">Register</button>
        <button onClick={handleClick1}>Go to Admin Login</button>
        <button onClick={handleClick2}>Go to User Login</button>
      </form>
    </div>
  );
};

export default Register;
