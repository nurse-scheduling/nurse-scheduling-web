import React from "react";
import { Box } from "@mui/material";
import ConstraintForm from "../../components/ConstraintForm";

function Constraint() {
    return (
        <Box sx={{ display: "flex"}} >
            <Box sx={{ width: "100%"}}>
                <ConstraintForm/>
            </Box>
        </Box>

    )

}


export default Constraint;
