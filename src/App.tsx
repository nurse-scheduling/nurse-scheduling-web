import React, {useContext} from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import {Box, useMediaQuery, useTheme} from "@mui/material";
import UserContext from './contexts/userContext';
import OffDayRequests from "./pages/requests/OffDayRequests";
import ChangeShift from "./pages/requests/ChangeShift";
import SideBar from "./components/SideBar";
import NurseProfile from "./pages/profile/profile";
import AllNurses from "./pages/allnurses/AllNurses";
import Nurse from "./pages/particular-nurse/Nurse";


function App() {
  const {authenticated} = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      {!authenticated ? <Routes>
        <Route element={<Login/>} path='*' />
        <Route element={<Login/>} path='/login'/>
      </Routes> :
          <Box>
            <SideBar/>
            <Box sx={{paddingLeft:isMobile?0:'26vh'}}>
              <Routes>
                <Route element={<Dashboard/>} path='/dashboard'/>
                <Route element={<OffDayRequests/>} path='/off-day-requests' />
                <Route element={<ChangeShift/>} path={'/change-shifts'}/>
                <Route element={<NurseProfile/>} path='/profile' />
                <Route element={<AllNurses/>} path='/nurses' />
                <Route element={<Nurse/>} path='/nurse' />
              </Routes>
            </Box>
          </Box>
  }

    </Box>

  );
}

export default App;
