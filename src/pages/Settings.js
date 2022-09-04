import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import 'moment-timezone'
import Card from '@mui/material/Card'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import DatePicker from 'react-datepicker'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const locales = {
  'en-US': require('date-fns/locale/en-US'),
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
        id: 0,
        title: 'apple picking',
        start: new Date(2022, 8, 6),
        end: new Date(2022, 8, 6)
    },
    {
        id: 1,
        title: 'plant carrots',
        start: new Date(2022, 8, 7),
        end: new Date(2022, 8, 10)
    },
    {
        id: 2,
        title: 'apple picking',
        start: new Date(2022, 8, 30),
        end: new Date(2022, 8, 30)
    },
    {
        id: 3,
        title: 'plant cherries',
        start: new Date(2022, 8, 17),
        end: new Date(2022, 8, 18)
    },
]

const adjEvents = events.map((it) => ({
    ...it,
    isDraggable: true,
  }))

const formatName = (name, count) => `${name}: ${count}`

export default function DnDOutsideResource() {
  const [myEvents, setMyEvents] = useState(adjEvents)
  const [draggedEvent, setDraggedEvent] = useState()
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
  const [counters, setCounters] = useState({ Water:0, Fertilize:0, Till:0 })

  function handleAddEvent() {
    setMyEvents([...myEvents, newEvent])
}  
  const handleDragStart = useCallback((event) => setDraggedEvent(event), [])

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

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
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )

  const newEvent = useCallback(
    (event) => {
      setMyEvents((prev) => {
        const idList = prev.map((item) => item.id)
        const newId = Math.max(...idList) + 1
        return [...prev, { ...event, id: newId }]
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
        isAllDay,
        isDraggable: true
      }
      setDraggedEvent(null)
      setCounters((prev) => {
        const { [name]: count } = prev
        return {
          ...prev,
          [name]: count + 1,
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

  const defaultDate = useMemo(() => new Date(2022, 8, 1), [])

  return (
    <Fragment>
        <Card className="dndOutsideSourceExample">
          <div className="inner">
            <h4>Workbench</h4>
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
            <div>
                <input type='text' placeholder='Add Title' style={{width: '20%', marginRight: '10px'}}
                    value={newEvent.title} onChange={(e) => setMyEvents({...newEvent,title:e.target.value})}
                />
                <DatePicker placeholderText='Start Date' style={{marginRight: '10px'}}
                selected={newEvent.start} onChange={(start)=>setMyEvents({...newEvent, start})} />
                <DatePicker placeholderText='End Date' 
                selected={newEvent.end} onChange={(end)=>setMyEvents({...newEvent, end})} />
                <button style={{marginTop: '10px'}} onClick={handleAddEvent}>AddEvent</button>
            </div>
          </div>
        </Card>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          dragFromOutsideItem={
            displayDragItemInCell ? dragFromOutsideItem : null
          }
          draggableAccessor="isDraggable"
          events={myEvents}
          localizer={localizer}
          onDropFromOutside={onDropFromOutside}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={newEvent}
          resizable
          selectable
          style={{ height:'600px' }}
        />
      </div>
    </Fragment>
  )
}
