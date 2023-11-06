import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function WorkCalendar() {
    
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'Etkinlik 1', date: '2023-11-06' },
                { title: 'Etkinlik 2', date: '2023-11-10' },
                
            ]}
        />

    )


}



export default WorkCalendar;