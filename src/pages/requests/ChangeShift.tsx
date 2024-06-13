import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import {Alert, AlertColor, Button, useMediaQuery, useTheme} from "@mui/material";
import {useFetchNursesAsAList} from "../../apis/nurses";
import {exchangeShifts, useFetchAvailableShiftsByNurseIdAndShift, useFetchShiftsByNurseId} from "../../apis/shifts";
import {NurseType} from "../../types/NurseType";
import {ShiftType} from "../../types/ShiftType";

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
    const { nurses } = useFetchNursesAsAList(basicAuth,loggedInNurse.departmentName);
    const [data, setData] = React.useState<Data[]>([]);
    const [message,setMessage] = useState<string>("");
    const [messageType,setMessageType] = useState<AlertColor>("error");

    useEffect(() => {
        if (nurses) {
            let nurseList = nurses.filter((nurse: NurseType) => nurse.role === "NURSE");

            console.log(nurseList);
            const newData = nurseList.map((nurse: NurseType) => {
                return {
                    avatar: nurse.profilePicture,
                    id: nurse.id,
                    ad_soyad: `${nurse.firstName} ${nurse.lastName}`,
                    departman: nurse.departmentName,

                };
            }).sort((a, b) => a.ad_soyad.localeCompare(b.ad_soyad));
            setData(newData);
        }
    }, [nurses]);

    const [firstNurse, setFirstNurse] = useState<Data>();
    const [secondNurse, setSecondNurse] = useState<Data>();
    const [selectedFirstShift, setSelectedFirstShift] = useState<ShiftData>();
    const [selectedSecondShift, setSelectedSecondShift] = useState<ShiftData>();
    const [filteredFirstNurseShifts, setFilteredFirstNurseShifts] = useState<ShiftType[]>([]);
    const [filteredSecondNurseShifts, setFilteredSecondNurseShifts] = useState<ShiftType[]>([]);
    const month = (new Date().getMonth()+1).toString();
    const year = new Date().getFullYear().toString();
    const { shifts: firstNurseShifts } = useFetchShiftsByNurseId(firstNurse?.id || "", basicAuth,month,year);
    const { shifts: secondNurseShifts } = useFetchAvailableShiftsByNurseIdAndShift(secondNurse?.id || "", basicAuth,month,year,selectedFirstShift?.id || "");

    useEffect(() => {
        if (firstNurseShifts) {
            const today = new Date();
            const firstShifts = firstNurseShifts.map(shift => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());
                return {
                    ...shift,
                    startDate: utcStart,
                    endDate: utcEnd,
                } as ShiftType
            }).filter(shift => shift.startDate > today)
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
            setFilteredFirstNurseShifts(firstShifts);
        }
    }, [firstNurseShifts]);

    useEffect(() => {
        if (secondNurseShifts) {
            const today = new Date();
            const secondShifts = secondNurseShifts.map(shift => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());
                return {
                    ...shift,
                    startDate: utcStart,
                    endDate: utcEnd,
                } as ShiftType
            }).filter(shift => shift.startDate > today)
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
            setFilteredSecondNurseShifts(secondShifts);
        }
    }, [secondNurseShifts]);

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
                setMessage("Vardiyalar başarıyla değiştirildi");
                setMessageType("success");
            }).catch(error => {
                setMessage("Vardiyaları değişirken bir hata oluştu");
                setMessageType("error");
            })
        }

    }
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const formatDateForTurkey = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Thimphu'
        };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', options).format(date);
    };

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
            flexDirection: "column",
        },
    };

    return (
        <Box sx={styles.container}>
            {message && <Alert severity={messageType} style={{marginBottom:'6vh'}}>{message}</Alert>}
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
                                {filteredFirstNurseShifts?.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${formatDateForTurkey(shift.startDate.toString())} - ${formatDateForTurkey(shift.endDate.toString())}`}</MenuItem>
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
                                disabled={!secondNurse || secondNurseShifts?.length === 0}
                            >
                                {filteredSecondNurseShifts?.map((shift) => (
                                    <MenuItem key={shift.id} value={shift.id}>{`${formatDateForTurkey(shift.startDate.toString())} - ${formatDateForTurkey(shift.endDate.toString())}`}</MenuItem>
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
