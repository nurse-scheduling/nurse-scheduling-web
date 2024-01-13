import React from "react";
import {Box,} from "@mui/material";
import AllNursesTable from "../../components/AllNursesTable";




function AllNurses() {

    return (
        <Box sx={{display: "flex"}}>
            <AllNursesTable/>
        </Box>
    )

}


export default AllNurses;
