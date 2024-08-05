import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import Dashboard from './components/Dashboard';
import Cars from './components/Cars';
import Register from './components/Register';






const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded.isAdmin;
};




function App() {
  return (
    <Router>
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/dashboard" element={<Dashboard/>}  render={props => (
    isAuthenticated() && isAdmin() ? (
      console.log("Not appropriate")
    ) : (
      <Navigate to="/admin-login" />
    )
  )} />
      <Route path="/" element={<Register/>} />
      <Route path="/cars" element={<Cars/>}  render={props => (
    isAuthenticated() ? (
      console.log("Not appropriate")
    ) : (
      <Navigate to="/user-login" />
    )
  )}/>
    </Routes>
  </Router>
  );
}

export default App;







