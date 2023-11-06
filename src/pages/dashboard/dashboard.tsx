import React from "react";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import WorkCalendar from "../../components/WorkCalendar";

function Dashboard() {

    return (
        <Box sx={{ display: "flex"}} >
            <Box>
                <SideBar></SideBar>
            </Box>
            <Box sx={{ width: "100%"}}>
                <WorkCalendar></WorkCalendar>
            </Box>
        </Box>
        
    )

}


export default Dashboard;