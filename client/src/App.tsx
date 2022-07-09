import React, { useState } from 'react';
import './App.css';
import { Home, LoginForm, ProtectedRoute, SignUpForm, Shell } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<{ [key: string]: any }>();
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="login" element={<LoginForm setUser={setUser} />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route
          element={
            <ProtectedRoute user={user}>
              <Shell setUser={setUser}/>
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;