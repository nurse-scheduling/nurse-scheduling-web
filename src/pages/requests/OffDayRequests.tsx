import React from "react";
import {Box,} from "@mui/material";
import OffDayRequestTable from "../../components/OffDayRequestTable";




function OffDayRequests() {

    return (
        <Box sx={{display: "flex"}}>
                <OffDayRequestTable/>
        </Box>
    )

}


export default OffDayRequests;
