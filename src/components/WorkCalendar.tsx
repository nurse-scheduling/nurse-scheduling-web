import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import trLocale from '@fullcalendar/core/locales/tr';
import {Box, Modal, Typography, useMediaQuery, useTheme} from '@mui/material';

interface SelectedEvent {
    title: string;
    startDate: Date | null;
    endDate: Date | null;
}

function WorkCalendar() {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>({
        endDate: null,
        startDate: null,
        title: '',
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
        <Box sx={{marginTop:isMobile?'75px':'0px'}}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Hüseyin Emre Üğdül', start: '2024-01-06T07:00:00', end: '2024-01-06T12:30:00' },
                    { title: 'Mert Batuhan Ünverdi', start: '2024-01-06T12:30:00', end: '2024-01-06T18:30:00' },
                    { title: 'Mert Batuhan Ünverdi', start: '2024-01-07T12:30:00', end: '2024-01-07T18:30:00' },
                    { title: 'Hüseyin Emre Üğdül', start: '2024-01-07T18:30:00', end: '2024-01-08T07:30:00' },
                ]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth',
                }}
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
