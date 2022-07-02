import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Authenticate, LoginForm, SignUpForm } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className="App">
      <h1 onClick={handleClick}>Ori Social network</h1>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Authenticate />} />
        <Route path="sign-up" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
