import './App.css';
import { Home, LoginForm, ProtectedRoute, SignUpForm, Shell, AppContainer, Inbox } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyWall from './components/myWall/MyWall';
import { CameraRoll } from './components/cameraRoll';
import CommentsThread from './components/comments/CommentsThread';
import Others from './components/shared/wall/Others';

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
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/comments/:postId" element={<CommentsThread />} />
            <Route path="/myWall" element={<MyWall />} />
            <Route path="/other/:userId" element={<Others />} />
            <Route path="/post" element={<CameraRoll />} />
          </Route>
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;