import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reduxStore/reducer/authReducer';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const { islog } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://18.158.81.67:8080/api/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      const token = data.token;
      console.log(data)
      console.log('token:', token);
      localStorage.setItem('token', token);
      dispatch(login({ islog: true, user: data }));
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  if (islog) {
    return <Navigate to="/homepage" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
      Login Form
    </h2>

    <Form onSubmit={handleLogin} className="space-y-6">
      {/* Username Input */}
      <Form.Group controlId="username">
        <Form.Label className="text-gray-600 font-medium">
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </Form.Group>

      {/* Password Input */}
      <Form.Group controlId="password">
        <Form.Label className="text-gray-600 font-medium">Password:</Form.Label>
        <div className="relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </Form.Group>

      {/* Error Message */}
      {loginError && (
        <div className="text-red-500 text-sm font-medium">{loginError}</div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Login
      </Button>
    </Form>
  </div>
</div>

  );
};

export default Login;
