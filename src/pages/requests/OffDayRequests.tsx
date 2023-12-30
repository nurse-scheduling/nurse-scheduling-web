import React from "react";
import SideBar from "../../components/SideBar";
import {Box,} from "@mui/material";
import OffDayRequestTable from "../../components/OffDayRequestTable";




function OffDayRequests() {

    return (
        <Box sx={{display: "flex"}}>
            <Box>
                <SideBar></SideBar>
            </Box>
                <OffDayRequestTable/>
        </Box>
    )

}


export default OffDayRequests;
