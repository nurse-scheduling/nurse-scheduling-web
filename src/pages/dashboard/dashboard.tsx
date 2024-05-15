import React from "react";
import { Box } from "@mui/material";
import WorkCalendar from "../../components/WorkCalendar";

function Dashboard() {
    return (
        <Box sx={{ display: "flex"}} >
            <Box sx={{ width: "100%"}}>
                <WorkCalendar></WorkCalendar>
            </Box>
        </Box>

    )

}


export default Dashboard;
