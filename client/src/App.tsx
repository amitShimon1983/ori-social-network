import React, { useEffect, useState } from 'react';
import './App.css';
import { Authenticate, Home, LoginForm, ProtectedRoute, SignUpForm, Button } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { httpService } from './services';
import { appConfig } from './configuration';

function App() {
  const [user, setUser] = useState<{ [key: string]: any }>();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home")
  }
  const handleLogout = async () => {
    const url = `${appConfig.serverUrl}${appConfig.logoutEndpoint}`
    const res: any = await httpService.post(url);
    localStorage.setItem('user', '');
    setUser(undefined)
    navigate("/login")
  }
  const refreshToken = async () => {
    const url = `${appConfig.serverUrl}/api/refresh`
    await httpService.get(url);
  }

  return (
    <div className="App">
      <Button handleClick={handleNavigate}>Go big or go home</Button>
      <Button handleClick={handleLogout}>logout</Button>
      <Button handleClick={refreshToken}>refresh</Button>
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