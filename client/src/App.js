import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/Sidebar/Sidebar';
import SearchBooks from './components/Search/SearchBook';
import ManageBooks from './components/Manage/ManageBook';
import ManageUsers from './components/Manage/ManageUser';
import './App.css';


const App = () => (
  <Router>
    <SideBar>
    <Routes>
      <Route path="/searchbook" element={<SearchBooks />} /> 
      <Route path="/managebook" element={<ManageBooks />} />
      <Route path="/manageuser" element={<ManageUsers />} />
    </Routes>
    </SideBar>
  </Router>
);

export default App;
