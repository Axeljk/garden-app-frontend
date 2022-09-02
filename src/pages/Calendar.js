import React, {useState} from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import DatePicker from 'react-datepicker'

const locales = {
    'en-US': require('date-fns/locale/en-US')
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: 'Farmers Market',
        start: new Date(2022,9,10),
        end: new Date(2022,9,10)
    },
    {
        title: 'Harvest tomatoes',
        start: new Date(2022,9,1),
        end: new Date(2022,9,12)
    },
    {
        title: 'Harvest peaches',
        start: new Date(2022,9,2),
        end: new Date(2022,9,7)
    },
    {
        title: 'Can salsa',
        start: new Date(2022,9,17),
        end: new Date(2022,9,17)
    },
]

export default function CalendarPage() {
    const [newEvent, setNewEvent] = useState({title:'', start: '', end:''})
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div>
            <h1>Garden Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type='text' placeholder='Add Title' style={{width: '20%', marginRight: '10px'}}
                    value={newEvent.title} onChange={(e) => setNewEvent({...newEvent,title:e.target.value})}
                />
                <DatePicker placeholderText='Start Date' style={{marginRight: '10px'}}
                selected={newEvent.start} onChange={(start)=>setNewEvent({...newEvent, start})} />
                <DatePicker placeholderText='End Date' 
                selected={newEvent.end} onChange={(end)=>setNewEvent({...newEvent, end})} />
                <button style={{marginTop: '10px'}} onClick={handleAddEvent}>AddEvent</button>
            </div>
            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor='start' 
            endAccesor='end' 
            style={{height: 500, margin: '50px'}} />
        </div>
    )
}