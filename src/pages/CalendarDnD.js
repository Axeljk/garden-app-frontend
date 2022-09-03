import React, {useState, useCallback} from 'react'
import { Calendar,Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import DatePicker from 'react-datepicker'
import { useMemo } from 'react'

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

const DragAndDropCalendar = withDragAndDrop(Calendar)

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

const adjEvents = events.map((it,ind) => ({
    ...it,
    isDraggable: ind % 2 === 0,
}))

const formatName = (name,count) => `${name} ID ${count}`


export default function CalendarPage({localizer}) {
    const [newEvent, setNewEvent] = useState({title:'', start: '', end:''})
    // const [myEvents, setAllEvents] = useState(events)
    const [myEvents, setMyEvents] = useState(adjEvents)
    const [draggedEvent, setDraggedEvent] = useState()
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [counters, setCounters] = useState({ water: 0, weeding: 0, planting: 0, compost: 0, rotate: 0, insecticide: 0, pruning: 0})
    
    const eventPropGetter = useCallback(
        (event) => ({
            ...(event.isDraggable
                ? { className: 'isDragable'}
                : {className: 'nonDraggable'})
        }),
        []
    )

    const handleDragStart = useCallback((event) => setDraggedEvent(event), [])
    const dragFromWorkbench = useCallback(() => draggedEvent, [draggedEvent])

    const handleDisplayDragItemInCell = useCallback(
        () => setDisplayDragItemInCell((prev) => !prev),
        []
    )

    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }
            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, {...existing, start, end, allDay}]
            })
        },
        [setMyEvents]
    )

    const onDropFromOutside = useCallback(
        ({ start, end, allDay: isAllDay }) => {
        const { name } = draggedEvent
        const event = {
            title: formatName(name, counters[name]),
            start,
            end,
            isAllDay
        }
        setDraggedEvent(null)
        setCounters((prev) => {
            const { [name]: count } = prev
            return {
                ...prev,
                [name]: count +1,
            }
        })
        newEvent(event)
    },
    [draggedEvent, counters, setDraggedEvent, setCounters, newEvent]
    )

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end }]
            })
        },
        [setMyEvents]
    )

    const defaultDate = useMemo(() => new Date(2022, 9, 2), [])

    function handleAddEvent() {
        setMyEvents([...myEvents, newEvent])
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
            <div>
                <h4>Workbench</h4>
                {Object.entries(counters).map(([name,count])=> (
                    <div 
                        draggable='true'
                        key={name}
                        onDragStart={() =>
                        handleDragStart({ title: formatName(name,count), name})
                    }
                    >
                        {formatName(name,count)}
                    </div>
                ))}
            </div>
            <div>
            <DragAndDropCalendar
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            dragFromWorkbench={dragFromWorkbench} 
            draggableAccessor='isDraggable'
            eventPropGetter={eventPropGetter}
            onDropFromOutside={onDropFromOutside}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            onSelectSlot={newEvent}
            localizer={localizer} 
            events={myEvents} 
            resizable
            selectable
            startAccessor='start' 
            endAccesor='end' 
            style={{height: 500, margin: '50px'}} />
            </div>
        </div>
    )
}