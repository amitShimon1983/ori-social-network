import React from 'react';
import './App.css';
import { Authenticate, Home, LoginForm, ProtectedRoute, SignUpForm } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from './components';
function App() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/")
  }

  return (
    <div className="App">
      <Button handleClick={handleClick}>Go big or go home</Button>
      <h1 >Ori Social network</h1>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route
          path="home"
          element={
            <ProtectedRoute user={undefined}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;