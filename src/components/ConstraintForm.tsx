import React, { useEffect, useState } from "react";
import { Box, Button, FormLabel, TextField, Modal, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { createConstraint, useFetchConstraint } from "../apis/constraints";
import { NurseType } from "../types/NurseType";

function ConstraintForm() {
    const [dayShift, setDayShift] = useState<number>(0);
    const [nightShift, setNightShift] = useState<number>(0);
    const [fullShift, setFullShift] = useState<number>(0);
    const basicAuth = localStorage.getItem("basicAuth");
    const userString = localStorage.getItem("nurse");
    const user: NurseType = userString ? JSON.parse(userString) : {};
    const { constraint } = useFetchConstraint(basicAuth, user.departmentName);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log(constraint);

    useEffect(() => {
        if (constraint && constraint.id != null && constraint.minimumNursesForEachShift.length > 0) {
            setDayShift(constraint.minimumNursesForEachShift.at(0) || 0);
            setNightShift(constraint.minimumNursesForEachShift.at(1) || 0);
            setFullShift(constraint.minimumNursesForEachShift.at(2) || 0);
        }
    }, [constraint]);

    const handleConstraints = async () => {
        if (dayShift <= 0 || nightShift <= 0 || fullShift <= 0) {
            setError("Lütfen pozitif bir sayı giriniz.");
            return;
        }
        setError("");
        let array = [dayShift, nightShift, fullShift];
        try {
            await createConstraint(user.departmentName, array, basicAuth);
            setSuccess("Kısıtlamalar başarıyla kaydedildi.");
            handleOpenModal();
        } catch (error: any) {
            if (error.message) {
                setError(error.message);
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    flexDirection: 'column',
                    display: 'flex',
                }}
            >
                <FormControl>
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AnnouncementIcon color={"error"} sx={{ mr: 1 }} />
                        <h2>Her vardiyada kaç hemşire çalışacağını belirtiniz.</h2>
                    </Box>
                    <FormLabel>Gündüz Vardiyası (08:00 - 16:00)</FormLabel>
                    <TextField
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{
                            '& input[type=number]': {
                                '-moz-appearance': 'textfield',
                            },
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                        }}
                        value={dayShift}
                        onChange={(e) => {
                            setDayShift(parseInt(e.target.value));
                        }}
                    />
                    <FormLabel>16 Saatlik Nöbet (16:00 - 08:00)</FormLabel>
                    <TextField
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{
                            '& input[type=number]': {
                                '-moz-appearance': 'textfield',
                            },
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                        }}
                        value={nightShift}
                        onChange={(e) => {
                            setNightShift(parseInt(e.target.value));
                        }}
                    />
                    <FormLabel>Tam Gün Nöbet (08:00 - 08:00)</FormLabel>
                    <TextField
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{
                            '& input[type=number]': {
                                '-moz-appearance': 'textfield',
                            },
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                            },
                        }}
                        value={fullShift}
                        onChange={(e) => {
                            setFullShift(parseInt(e.target.value));
                        }}
                    />
                    <Button sx={{ mt: 2 }} variant={'contained'} onClick={handleConstraints}>Gönder</Button>
                </FormControl>
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Başarılı
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {success}
                    </Typography>
                    <Button sx={{ mt: 2 }} variant={'contained'} onClick={handleCloseModal}>Kapat</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default ConstraintForm;
