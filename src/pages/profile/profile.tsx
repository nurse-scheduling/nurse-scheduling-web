import React from "react";
import SideBar from "../../components/SideBar";
import {Box,} from "@mui/material";
import OffDayRequestTable from "../../components/OffDayRequestTable";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";




function Profile() {
    const nurse = {
        firstName: "Hüseyin Emre",
        lastName: "Üğdül",
        birthDate: "4 Haziran 2000",
        department: "dahiliye",
        profilePicture: "https://cdn-icons-png.flaticon.com/512/8496/8496122.png"
    }
    return (
        <Box >
            <Box>
                <SideBar></SideBar>
            </Box>
            <Box flexDirection="column">
                <NurseProfile nurse={nurse}/>
                <WorkCalendar></WorkCalendar>
            </Box>
                
        </Box>
    )

}


export default Profile;
