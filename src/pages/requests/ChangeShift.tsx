import React, {useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import {Button, useMediaQuery, useTheme} from "@mui/material";
import {useFetchNursesList} from "../../apis/nurses";
import { exchangeShifts, useFetchShiftsByNurseId } from "../../apis/shifts";
import {NurseType} from "../../types/NurseType";
import { useNavigate } from "react-router";

interface Data {
    avatar: string;
    id: string;
    ad_soyad: string;
    departman: string;
}
interface ShiftData {
    id: string,
    startDate: Date,
    endDate: Date,
    nurseId: string
}

export default function ChangeShift() {
    const theme = useTheme();
    const basicAuth = localStorage.getItem("basicAuth");
    const loggedInNurse = JSON.parse(localStorage.getItem("nurse") as string);
    const { nurses } = useFetchNursesList(basicAuth,loggedInNurse.departmentName);
    const navigation = useNavigate();
    const [data, setData] = React.useState<Data[]>([]);

    useEffect(() => {
        if (nurses) {
            const newData = nurses.map((nurse: NurseType) => {
                return {
                    avatar: nurse.profilePicture,
                    id: nurse.id,
                    ad_soyad: `${nurse.firstName} ${nurse.lastName}`,
                    departman: nurse.departmentName,

                };
            });
            setData(newData);
        }
    }, [nurses]);

    const [firstNurse, setFirstNurse] = React.useState<Data>();
    const [secondNurse, setSecondNurse] = React.useState<Data>();
    const [selectedFirstShift, setSelectedFirstShift] = React.useState<ShiftData>();
    const [selectedSecondShift, setSelectedSecondShift] = React.useState<ShiftData>();

    const { shifts: firstNurseShifts } = useFetchShiftsByNurseId(firstNurse?.id || "", basicAuth)
    const { shifts: secondNurseShifts } = useFetchShiftsByNurseId(secondNurse?.id || "", basicAuth)



    const handleFirstChange = (event: SelectChangeEvent) => {
        const selectedNurseId = (event.target.value);
        const selectedNurse = data.find(nurse => nurse.id === selectedNurseId);
        setFirstNurse(selectedNurse);
    };
    const handleSecondChange = (event: SelectChangeEvent) => {
        const selectedNurseId = (event.target.value);
        const selectedNurse = data.find(nurse => nurse.id === selectedNurseId);
        setSecondNurse(selectedNurse);

    };
    const handleFirstShiftChange = (event: SelectChangeEvent) => {
        const selectedShiftId = event.target.value;
        const selectedShift = firstNurseShifts?.find(shift => shift.id === selectedShiftId);
        setSelectedFirstShift(selectedShift);
    }
    const handleSecondShiftChange = (event: SelectChangeEvent) => {
        const selectedShiftId = event.target.value;
        const selectedShift = secondNurseShifts?.find(shift => shift.id === selectedShiftId);
        setSelectedSecondShift(selectedShift);
    }
    const handleExchange = () => {
        if(firstNurse && secondNurse && selectedFirstShift && selectedSecondShift){
            exchangeShifts(firstNurse?.id, secondNurse?.id, selectedFirstShift?.id, selectedSecondShift?.id, basicAuth).then(() => {
                navigation("/dashboard")
            }).catch(error => {
                console.error(error)
            })
        }

    }
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const styles = {
        changeShiftBox: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            border: "solid",
            borderColor: "lightblue",
            borderRadius: "10px",
            padding: isMobile ? "20px" : "50px",
            gap: "20px",
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
        },
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: isMobile ? "40vh" : "30vh",
            padding: isMobile ? "20px" : "50px",
            width: isMobile ? "100%" : "auto",
        },
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.changeShiftBox}>
                <Box sx={{flexDirection:'column'}}>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 250, maxWidth:250}} size="small">
                            <InputLabel id="demo-select-small-label-first">Birinci Hemşire</InputLabel>
                            <Select
                                labelId="demo-select-small-label-first"
                                id="demo-select-small-first"
                                value={firstNurse?firstNurse?.id : ""}
                                label="Birinci Hemşire"
                                onChange={handleFirstChange}
                            >
                                {data.map((nurse) => (
                                    <MenuItem key={nurse.id} value={nurse.id}>{nurse.ad_soyad}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 250, maxWidth:250}} size="small">
                            <InputLabel id="demo-select-medium-label">Birinci Hemşire Vardiya</InputLabel>
                            <Select
                                labelId="demo-select-medium-label"
                                id="demo-select-medium-second"
                                value={selectedFirstShift?selectedFirstShift.id:""}
                                label="Birinci Hemşire Vardiya"
                                onChange={handleFirstShiftChange}
                                disabled={!firstNurse}
                            >
                                {firstNurseShifts?.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${shift.startDate} - ${shift.endDate} `}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{flexDirection:'column'}}>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 250, maxWidth:250}} size="small">
                            <InputLabel id="demo-select-small-label-first">İkinci Hemşire</InputLabel>
                            <Select
                                labelId="demo-select-small-label-first"
                                id="demo-select-small-first"
                                value={secondNurse?secondNurse?.id : ""}
                                label="İkinci Hemşire"
                                onChange={handleSecondChange}
                            >
                                {data.map((nurse) => (
                                    <MenuItem key={nurse.id} value={nurse.id}>{nurse.ad_soyad}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 250, maxWidth:250}} size="small">
                            <InputLabel id="demo-select-medium-label">İkinci Hemşire Vardiya</InputLabel>
                            <Select
                                labelId="demo-select-medium-label"
                                id="demo-select-medium-second"
                                value={selectedSecondShift?selectedSecondShift.id:""}
                                label="İkinci Hemşire Vardiya"
                                onChange={handleSecondShiftChange}
                                disabled={!secondNurse}
                            >
                                {secondNurseShifts?.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${shift.startDate} - ${shift.endDate} `}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button onClick={handleExchange} disabled={!firstNurse || !secondNurse ||firstNurse?.id===secondNurse?.id} variant="contained" sx={{ m: 1, minWidth: 250, maxWidth:250}} size="large">Değiştir</Button>
                </Box>
            </Box>
        </Box>
    );
}
