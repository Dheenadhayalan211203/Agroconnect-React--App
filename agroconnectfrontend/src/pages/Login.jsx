import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check user credentials
    if (email === 'farmer@gmail.com' && password === 'farmer@123') {
      // Redirect to Home component
      navigate('/');
    } else if (email === 'vishnu@gmail.com' && password === 'vishnu@123') {
      // Redirect to Userdashboard1 component
      navigate('/userdashboard1');
    } else if (email === 'thulasi@gmail.com' && password === 'thulasi@123') {
      // Redirect to Userdashboard2 component
      navigate('/userdashboard2');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='login-cooontainer'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='email-cont'>
           <h2>Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='pass-cont'>
           <h2>Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="loginbutton" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
