import {React, useState }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BlogEditorPage from './pages/BlogEditorPage';
import HomePage from './pages/HomePage';
import PublishedBlog from './pages/PublishedBlog';
import DraftBlog from './pages/DraftBlog';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {

  const[user, setUser] = useState(null);

  return (
    <>
    <AuthProvider>
      <Router>
            <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/published-blogs" 
            element={
              <PrivateRoute>
                <PublishedBlog /> 
              </PrivateRoute>
            } />
          <Route 
            path="/drafts-blogs" 
            element={
              <PrivateRoute>
                <DraftBlog />
              </PrivateRoute>
            } />
          <Route
            path="/editor/:id?"
            element={
              <PrivateRoute>
                <BlogEditorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
   </> 
  );
}

export default App;
