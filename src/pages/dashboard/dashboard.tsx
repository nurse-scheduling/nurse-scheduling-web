import React from "react";
import { Box } from "@mui/material";
import WorkCalendar from "../../components/WorkCalendar";
import {useFetchAllShits} from "../../apis/shifts";

function Dashboard() {
    const basicAuth = localStorage.getItem('basicAuth');
    const {shifts,isLoading} = useFetchAllShits(basicAuth);

    if (isLoading || shifts === undefined) {
        return <p>Loading...</p>;
    }
    return (
        <Box sx={{ display: "flex"}} >
            <Box sx={{ width: "100%"}}>
                <WorkCalendar shifts={shifts}></WorkCalendar>
            </Box>
        </Box>

    )

}


export default Dashboard;
