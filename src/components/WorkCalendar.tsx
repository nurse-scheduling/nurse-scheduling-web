import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import trLocale from '@fullcalendar/core/locales/tr';

function WorkCalendar() {
    
    return (
        <FullCalendar
            plugins={[dayGridPlugin,timeGridPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'Hüseyin Emre Üğdül', start: "2023-12-06T07:00:00", end: "2023-12-06T12:30:00" },
                { title: 'Mert Batuhan Ünverdi', start: "2023-12-06T12:30:00", end: "2023-12-06T18:30:00" },
                { title: 'Mert Batuhan Ünverdi', start: "2023-12-07T12:30:00", end: "2023-12-07T18:30:00" },
                { title: 'Hüseyin Emre Üğdül', start: "2023-12-07T18:30:00", end: "2023-12-08T07:30:00" },
                
            ]}
            headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "timeGridWeek,dayGridMonth"
            }}
            locales={[trLocale]}
            locale="tr"
            timeZone='local'
        />

    )


}



export default WorkCalendar;