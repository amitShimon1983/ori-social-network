import React, { useEffect, useState } from 'react';
import './App.css';
import { Authenticate, Home, LoginForm, ProtectedRoute, SignUpForm, Button } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { httpService } from './services';
import { appConfig } from './configuration';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const item = localStorage.getItem('user');
    if (item) {
      setUser(JSON.parse(item));
    }
  }, [])
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home")
  }
  const handleLogout = async () => {
    localStorage.setItem('user', '');
    const url = `${appConfig.serverUrl}${appConfig.logoutEndpoint}`
    const res: any = await httpService.post(url);
    setUser(undefined)
    navigate("/")
  }
  const refreshToken = async () => {
    const url = `${appConfig.serverUrl}/api/refresh`
    const res: any = await httpService.get(url);
    setUser(undefined)
    navigate("/")
  }

  return (
    <div className="App">
      <Button handleClick={handleNavigate}>Go big or go home</Button>
      <Button handleClick={handleLogout}>logout</Button>
      <Button handleClick={refreshToken}>refresh</Button>
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