import React, { useState } from 'react';
import './App.css';
import { Home, LoginForm, ProtectedRoute, SignUpForm, Shell, StoreProvider } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [user, setUser] = useState<{ [key: string]: any }>();
  return (
    <StoreProvider>
      <div className="app">
        <Routes>
          <Route path="*" element={<Navigate to={'home'} />} />
          <Route path="login" element={<LoginForm setUser={setUser} />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route
            element={
              <ProtectedRoute user={user}>
                <Shell setUser={setUser} />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;