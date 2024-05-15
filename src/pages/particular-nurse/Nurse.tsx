import React from "react";
import {Box,} from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import {useFetchNurse} from "../../apis/nurses";
import {useNavigate, useParams} from "react-router";




function Nurse() {
    const basicAuth = localStorage.getItem("basicAuth");
    const { id } = useParams();
    const navigate = useNavigate();
    if(!id)
    {
        navigate('/nurses');
    }

    const {nurse} = useFetchNurse(id||'',basicAuth);
    return (
        <Box >
            {nurse?
                <Box flexDirection="column">
                    <NurseProfile nurse={nurse}/>
                    <WorkCalendar nurseId={id}></WorkCalendar>
                </Box>
            :<></>}
        </Box>
    )

}


export default Nurse;
