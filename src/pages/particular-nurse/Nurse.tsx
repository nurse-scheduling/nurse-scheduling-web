import React, {useContext} from "react";
import {Box,} from "@mui/material";
import NurseProfile from "../../components/NurseProfile";
import WorkCalendar from "../../components/WorkCalendar";
import {useFetchNurse} from "../../apis/nurses";
import userContext from "../../contexts/userContext";
import {useNavigate, useParams} from "react-router";




function Nurse() {
    const {basicAuth} = useContext(userContext);
    const { id } = useParams();
    const navigate = useNavigate();
    if(!id)
    {
        navigate('/nurses')
    }
    const {nurse} = useFetchNurse(id||'',basicAuth);
    return (
        <Box >
            {nurse?
                <Box flexDirection="column">
                    <NurseProfile nurse={nurse}/>
                    <WorkCalendar></WorkCalendar>
                </Box>
            :<></>}
        </Box>
    )

}


export default Nurse;
