import React, {useContext} from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { Box } from "@mui/material";
import UserContext from './contexts/userContext';
import OffDayRequests from "./pages/requests/OffDayRequests";
import NurseProfile from "./pages/profile/profile";


function App() {
  const {authenticated} = useContext(UserContext);
  return (
    <Box>
      {!authenticated ? <Routes>
        <Route element={<Login/>} path='*' />
        <Route element={<Login/>} path='/login'/>
      </Routes> : <Routes>
        <Route element={<Dashboard/>} path='/dashboard'/>
        <Route element={<OffDayRequests/>} path='/off-day-requests' />
        <Route element={<NurseProfile/>} path='/profile' />
        
      </Routes>}

    </Box>

  );
}

export default App;
