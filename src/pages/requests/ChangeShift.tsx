import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import {Button, useMediaQuery, useTheme} from "@mui/material";

interface Nurse {
    name: string;
    id: string;
    shifts: Shift[];
}
interface Shift {
    id:string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}
export default function ChangeShift() {
    const theme = useTheme();
    const nurses: Nurse[] = [
        {
            name: 'Nurse 1',
            id: "1",
            shifts: [
                { id: generateRandomId(), startDate: "01.01.2024", endDate: "01.01.2024", startTime: "08:00", endTime: "16:00" },
                { id: generateRandomId(), startDate: "02.01.2024", endDate: "02.01.2024", startTime: "08:00", endTime: "16:00" }
            ]
        },
        {
            name: 'Nurse 2',
            id: "2",
            shifts: [
                { id: generateRandomId(), startDate: "01.01.2024", endDate: "02.01.2024", startTime: "16:00", endTime: "00:00" },
                { id: generateRandomId(), startDate: "02.01.2024", endDate: "03.01.2024", startTime: "16:00", endTime: "00:00" }
            ]
        },
        {
            name: 'Nurse 3',
            id: "3",
            shifts: [
                { id: generateRandomId(), startDate: "01.01.2024", endDate: "01.01.2024", startTime: "12:00", endTime: "20:00" },
                { id: generateRandomId(), startDate: "02.01.2024", endDate: "02.01.2024", startTime: "12:00", endTime: "20:00" }
            ]
        },
        {
            name: 'Nurse 4',
            id: "4",
            shifts: [
                { id: generateRandomId(), startDate: "01.01.2024", endDate: "01.01.2024", startTime: "00:00", endTime: "08:00" },
                { id: generateRandomId(), startDate: "02.01.2024", endDate: "02.01.2024", startTime: "00:00", endTime: "08:00" }
            ]
        },
    ];

    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }

    const [firstNurse, setFirstNurse] = React.useState<Nurse>();
    const [secondNurse, setSecondNurse] = React.useState<Nurse>();
    const [selectedFirstShift, setSelectedFirstShift] = React.useState<Shift>();
    const [selectedSecondShift, setSelectedSecondShift] = React.useState<Shift>();

    const handleFirstChange = (event: SelectChangeEvent) => {
        const selectedNurseId = (event.target.value);
        const selectedNurse = nurses.find(nurse => nurse.id === selectedNurseId);
        setFirstNurse(selectedNurse);
    };
    const handleSecondChange = (event: SelectChangeEvent) => {
        const selectedNurseId = (event.target.value);
        const selectedNurse = nurses.find(nurse => nurse.id === selectedNurseId);
        setSecondNurse(selectedNurse);
    };
    const handleFirstShiftChange = (event: SelectChangeEvent) => {
        const selectedShiftId = event.target.value;
        const selectedShift = firstNurse?.shifts.find(shift => shift.id === selectedShiftId);
        setSelectedFirstShift(selectedShift);
    }
    const handleSecondShiftChange = (event: SelectChangeEvent) => {
        const selectedShiftId = event.target.value;
        const selectedShift = secondNurse?.shifts.find(shift => shift.id === selectedShiftId);
        setSelectedSecondShift(selectedShift);
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
                                {nurses.map((nurse) => (
                                    <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
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
                                {firstNurse?.shifts.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${shift.startDate} - ${shift.endDate} / ${shift.startTime} - ${shift.endTime}`}</MenuItem>
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
                                {nurses.map((nurse) => (
                                    <MenuItem key={nurse.id} value={nurse.id}>{nurse.name}</MenuItem>
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
                                {secondNurse?.shifts.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${shift.startDate} - ${shift.endDate} / ${shift.startTime} - ${shift.endTime}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button disabled={!firstNurse || !secondNurse ||firstNurse?.id===secondNurse?.id} variant="contained" sx={{ m: 1, minWidth: 250, maxWidth:250}} size="large">Değiştir</Button>
                </Box>
            </Box>
        </Box>
    );
}
