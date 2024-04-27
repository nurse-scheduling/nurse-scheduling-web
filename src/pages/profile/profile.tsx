import React from "react";
import { Box } from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import { NurseType } from "../../types/NurseType";
import {useFetchShiftsByNurseId} from "../../apis/shifts";

function Profile() {
    const userString = localStorage.getItem("nurse");
    const basicAuth = localStorage.getItem("basicAuth");
    const user: NurseType = userString ? JSON.parse(userString) : {};
    const { shifts,isLoading } = useFetchShiftsByNurseId(user.id, basicAuth)

    if (isLoading || shifts === undefined) {
        return <p>Loading...</p>;
    }
    return (
        <Box>
            <Box flexDirection="column">
                <NurseProfile nurse={user} />
                <WorkCalendar shifts={shifts} />
            </Box>
        </Box>
    );
}

export default Profile;
