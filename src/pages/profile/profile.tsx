import React, {useContext} from "react";
import {Box,} from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import UserContext from "../../contexts/userContext";
import {NurseType} from "../../types/NurseType";




function Profile() {
    const { user } = useContext(UserContext) as { user: NurseType };
    return (
        <Box >
            <Box flexDirection="column">
                <NurseProfile nurse={user}/>
                <WorkCalendar></WorkCalendar>
            </Box>
        </Box>
    )

}


export default Profile;
