import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import trLocale from '@fullcalendar/core/locales/tr';
import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useFetchAllShifts} from "../apis/shifts";

interface SelectedEvent {
    title: string;
    startDate: Date | null;
    endDate: Date | null;
}

type Props = {
    nurseId?: string;
}

function WorkCalendar(props: Props) {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>({
        endDate: null,
        startDate: null,
        title: '',
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [events, setEvents] = useState<any[]>([]);
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const basicAuth = localStorage.getItem('basicAuth');
    const {shifts} = useFetchAllShifts(month,year,basicAuth,props.nurseId);

    useEffect(() => {
        if (shifts) {
            setEvents(shifts.map((shift) => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());

                return {
                    title: shift.nurseFirstName + ' ' + shift.nurseLastName,
                    start: utcStart,
                    end: utcEnd
                }
            }));
        }
    }, [shifts]);
    useEffect(() => {
        setMonth((new Date().getMonth() + 1).toString());
        setYear(new Date().getFullYear().toString());
    }, []);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        textAlign: 'center' as 'center',
        backgroundColor: 'white',
    };

    return (
        <Box sx={{ marginTop: isMobile ? '75px' : '0px' }}>
            <FullCalendar
                datesSet={(dateInfo) => {
                    const newMonth = (dateInfo.view.currentStart.getMonth() + 1).toString();
                    const newYear = dateInfo.view.currentStart.getFullYear().toString();
                    if (newMonth !== month || newYear !== year) {
                        setMonth(newMonth);
                        setYear(newYear);
                    }
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth',
                }}
                events={events}
                locales={[trLocale]}
                locale="tr"
                timeZone="local"
                eventClick={(arg) => {
                    openModal();
                    setSelectedEvent({
                        title: arg.event.title,
                        startDate: arg.event.start,
                        endDate: arg.event.end,
                    });
                }}
                handleWindowResize={true}
            />
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, '@media (min-width: 600px)': { width: '70%' } }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectedEvent.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Başlangıç: {selectedEvent.startDate?.toLocaleDateString()} - {selectedEvent.startDate?.toLocaleTimeString().replace(':00', '')}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Bitiş: {selectedEvent.endDate?.toLocaleDateString()} - {selectedEvent.endDate?.toLocaleTimeString().replace(':00', '')}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}

export default WorkCalendar;
