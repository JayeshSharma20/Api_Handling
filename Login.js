import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reduxStore/reducer/authReducer';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility =()=>{
    setShowPassword(!showPassword)
  }
  
  const submit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  if (user) {
    return <Navigate to="/" />; 
  }

  return (
    <div className="bg-black flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>
        
        <Form onSubmit={submit} className="space-y-4">
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <div className='relative'>
            <Form.Control
              type= {showPassword? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <span
                className="absolute right-2 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                   {showPassword ? <FaEye />: <FaEyeSlash /> }
                </span>
                </div>
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
