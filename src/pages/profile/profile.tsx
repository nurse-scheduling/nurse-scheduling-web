import React from "react";
import { Box } from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import { NurseType } from "../../types/NurseType";

function Profile() {
    const userString = localStorage.getItem("nurse");
    const user: NurseType = userString ? JSON.parse(userString) : {};

    return (
        <Box>
            <Box flexDirection="column">
                <NurseProfile nurse={user} />
                <WorkCalendar />
            </Box>
        </Box>
    );
}

export default Profile;
