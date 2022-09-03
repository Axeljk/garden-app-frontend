import React, {useState, useCallback} from 'react'
import { Calendar,Views,dateFnsLocalizer } from 'react-big-calendar'
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

const testEvents = [
    {
        title: 'Farmers Market',
        start: new Date(2022,9,10),
        end: new Date(2022,9,10),
    },
    {
        title: 'Harvest tomatoes',
        start: new Date(2022,9,12),
        end: new Date(2022,9,12)
    },
]

// const adjEvents = events.map((it,ind) => ({
//     ...it,
//     isDraggable: ind % 2 === 0,
// }))

const formatName = (name,count) => `${name}: ${count}`


export default function CalendarPage() {
    const [newEvent, setNewEvent] = useState({title:'', start: '', end:''})
    // const [myEvents, setAllEvents] = useState(events)
    const [allEvents, setAllEvents] = useState(testEvents)
    const [draggedEvent, setDraggedEvent] = useState()
    // const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [counters, setCounters] = useState({ Water: 0, Weeding: 0, Planting: 0, Compost: 0, Rotate: 0, Insecticide: 0, Pruning: 0})
    
    // const eventPropGetter = useCallback(
    //     (event) => ({
    //         ...(event.isDraggable
    //             ? { className: 'isDraggable'}
    //             : {className: 'nonDraggable'})
    //     }),
    //     []
    // )

    const handleDragStart = useCallback((event) => setDraggedEvent(event), [])
    const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

    // const handleDisplayDragItemInCell = useCallback(
    //     () => setDisplayDragItemInCell((prev) => !prev),
    //     []
    // )

    const moveEvent = useCallback(
        ({ event, start, end, isallDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }
            setAllEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, {...existing, start, end, allDay}]
            })
        },
        [setAllEvents]
    )

    const onDropFromOutside = useCallback(
        ({ start, end }) => {
        const { name } = draggedEvent
        const event = {
            title: formatName(name, counters[name]),
            start,
            end
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
            setAllEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end }]
            })
        },
        [setAllEvents]
    )

    const defaultDate = useMemo(() => new Date(2022, 9, 2), [])

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div>
            <h1>Garden Calendar with Drag 'n Drop</h1>
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
            <div className="inner">
            <h4>Outside Drag Sources</h4>
            {Object.entries(counters).map(([name, count]) => (
              <div
                draggable="true"
                key={name}
                onDragStart={() =>
                  handleDragStart({ title: formatName(name, count), name })
                }
              >
                {formatName(name, count)}
              </div>
            ))}
          </div>
            {/* <div>
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
            </div> */}
            <div>
            <DragAndDropCalendar
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            dragFromOutsideItem={dragFromOutsideItem} 
            draggableAccessor={(event) => true}
            // eventPropGetter={eventPropGetter}
            onDropFromOutside={onDropFromOutside}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            onSelectSlot={newEvent}
            localizer={localizer} 
            events={allEvents} 
            resizable
            selectable
            startAccessor='start' 
            endAccesor='end' 
            style={{height: 500, margin: '50px'}} />
            </div>
        </div>
    )
}