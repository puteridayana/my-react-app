import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/Sidebar/Sidebar';
import SearchBooks from './components/Search/SearchBook';
import ManageBooks from './components/Manage/ManageBook';
import ManageUsers from './components/Manage/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthContext } from './context/AuthContext';  // Import AuthContext
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/searchbook" replace />;
  }

  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);  // Get the current authenticated user

  return (
    <Router>
      <div className="app-container">
        {user && <SideBar />}  {/* Conditionally render the sidebar */}
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/searchbook" element={<SearchBooks />} />
            <Route
              path="/managebook"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageuser"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
