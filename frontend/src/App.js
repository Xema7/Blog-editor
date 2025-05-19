import {React, useState }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BlogEditorPage from './pages/BlogEditorPage';
import BlogListPage from './pages/BlogListPage';
import PublishedBlog from './pages/PublishedBlog';
import DraftBlog from './pages/DraftBlog';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {

  const[user, setUser] = useState(null);

  return (
    <>
    <AuthProvider>
      <Router>
            <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/published-blogs" element={<PublishedBlog />} />
          <Route path="/drafts-blogs" element={<DraftBlog />} />
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
                <BlogListPage />
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
