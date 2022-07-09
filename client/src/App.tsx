import React, { useState } from 'react';
import './App.css';
import { Home, LoginForm, ProtectedRoute, SignUpForm, Button } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { authService } from './services';

function App() {
  const [user, setUser] = useState<{ [key: string]: any }>();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home")
  }
  const handleLogout = async () => {
    await authService.logout(() => {
      setUser(undefined)
      navigate("/login")
    })
  }
  const refreshToken = async () => {
    await authService.refresh()
  }

  return (
    <div className="App">
      <Button handleClick={handleNavigate}>Go &#127968;</Button>
      <Button handleClick={handleLogout}>logout</Button>
      <Button handleClick={refreshToken}>&#10227;</Button>
      <h1>Ori Social network</h1>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="login" element={<LoginForm setUser={setUser} />} />
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