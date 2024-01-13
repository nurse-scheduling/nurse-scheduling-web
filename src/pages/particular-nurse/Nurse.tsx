import React from "react";
import {Box,} from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";




function Nurse() {
    const nurse = {
        firstName: "Hüseyin Emre",
        lastName: "Üğdül",
        birthDate: "4 Haziran 2000",
        department: "dahiliye",
        profilePicture: "https://cdn-icons-png.flaticon.com/512/8496/8496122.png"
    }
    return (
        <Box >
            <Box flexDirection="column">
                <NurseProfile nurse={nurse}/>
                <WorkCalendar></WorkCalendar>
            </Box>
        </Box>
    )

}


export default Nurse;
