import React from "react";
import {Box,} from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import {useFetchNurse} from "../../apis/nurses";
import {useNavigate, useParams} from "react-router";
import {useFetchShiftsByNurseId} from "../../apis/shifts";




function Nurse() {
    const basicAuth = localStorage.getItem("basicAuth");
    const { id } = useParams();
    const navigate = useNavigate();
    if(!id)
    {
        navigate('/nurses');
    }
    const { shifts,isLoading } = useFetchShiftsByNurseId(id||'', basicAuth)


    const {nurse} = useFetchNurse(id||'',basicAuth);
    if (isLoading || shifts === undefined) {
        return <p>Loading...</p>;
    }
    return (
        <Box >
            {nurse?
                <Box flexDirection="column">
                    <NurseProfile nurse={nurse}/>
                    <WorkCalendar shifts={shifts}></WorkCalendar>
                </Box>
            :<></>}
        </Box>
    )

}


export default Nurse;
