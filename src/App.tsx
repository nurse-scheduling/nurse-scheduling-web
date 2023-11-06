import React, {useState, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { Box } from "@mui/material";
import UserContext from './contexts/userContext';


function App() {
  const {authenticated} = useContext(UserContext);
  return (
    <Box>
      {!authenticated ? <Routes>
        <Route element={<Login/>} path='*' />
        <Route element={<Login/>} path='/login'/>
      </Routes> : <Routes>
        <Route element={<Dashboard/>} path='/dashboard'/>
      </Routes>}
      
    </Box>
    
  );
}

export default App;
