import './App.css';
import { Home, LoginForm, ProtectedRoute, SignUpForm, Shell, AppContainer } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';



function App() {
  return (
    <AppContainer>
      <div className="app">
        <Routes>
          <Route path="*" element={<Navigate to={'home'} />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route
            element={
              <ProtectedRoute >
                <Shell />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;