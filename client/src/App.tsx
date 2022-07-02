import React, { useEffect, useState } from 'react';
import './App.css';
import { Authenticate, Home, LoginForm, ProtectedRoute, SignUpForm, Button } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const item = localStorage.getItem('i');
    if (item) {
      setUser(JSON.parse(item));
    }
  }, [])
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home")
  }
  const handleLogout = () => {
    localStorage.setItem('i', '');
    setUser(undefined)
    navigate("/")
  }

  return (
    <div className="App">
      <Button handleClick={handleNavigate}>Go big or go home</Button>
      <Button handleClick={handleLogout}>logout</Button>
      <h1>Ori Social network</h1>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route
          path="home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;