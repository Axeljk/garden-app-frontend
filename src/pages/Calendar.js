import * as React from 'react';
import {
  styled, darken, alpha, lighten,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import WbSunny from '@mui/icons-material/WbSunny';
import FilterDrama from '@mui/icons-material/FilterDrama';
import Opacity from '@mui/icons-material/Opacity';
import YardIcon from '@mui/icons-material/Yard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import videobg from '../assets/Plants/videoplayback.mp4'
import API from "../utils/API";

const PREFIX = 'Demo';

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
};

const getBorder = theme => (`1px solid ${
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

// #FOLD_BLOCK
const StyledOpacity = styled(Opacity)(() => ({
  [`&.${classes.rain}`]: {
    color: '#4FC3F7',
  },
}));
// #FOLD_BLOCK
const StyledWbSunny = styled(WbSunny)(() => ({
  [`&.${classes.sun}`]: {
    color: '#FFEE58',
  },
}));
// #FOLD_BLOCK
const StyledFilterDrama = styled(FilterDrama)(() => ({
  [`&.${classes.cloud}`]: {
    color: '#90A4AE',
  },
}));

// #FOLD_BLOCK
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-of-type': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: '#FFFDE7',
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: '#ECEFF1',
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: '#E1F5FE',
  },
  [`&.${classes.opacity}`]: {
    opacity: '0.5',
  },
}));
// #FOLD_BLOCK
const StyledDivText = styled('div')(() => ({
  [`&.${classes.text}`]: {
    padding: '0.5em',
    textAlign: 'center',
  },
}));
// #FOLD_BLOCK
const StyledDivContent = styled('div')(() => ({
  [`&.${classes.content}`]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
}));

// #FOLD_BLOCK
const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
}));

// #FOLD_BLOCK
const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    flex: 'none',
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));
// #FOLD_BLOCK
const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
  [`&.${classes.apptContent}`]: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
}));


const URL_PREFIX = process.env.PORT || "http://localhost:3001";
const allEvents=[];



//             fetch(`${URL_PREFIX}/api/events/`)
//                 .then(res => res.json())  
//                 .then(data => {
  //                     for(let i=0;i<data.length;i++)
  //                     {
    //                         alleventss.push(data);
    //                     }
    //                    console.log(data)}
    //                    )
    //                    window.localStorage.setItem("es",JSON.stringify(allevents))
    //                    console.log(allevents);
    // }
    const eCalls = (data)=>{
    fetch(`${URL_PREFIX}/api/events/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })}



const appointments = [
  {
    id: 0,
    title: 'Water',
    startDate: new Date(2022, 8, 23, 9, 30),
    endDate: new Date(2022, 8, 23, 11, 30),
   
  }, {
    id: 1,
    title: 'Planting',
    startDate: new Date(2022, 8, 28, 9, 30),
    endDate: new Date(2022, 8, 28, 11, 30),
  
  }, {
    id: 2,
    title: 'Harvest Pumpkins',
    startDate: new Date(2022, 8, 19, 12, 0),
    endDate: new Date(2022, 8, 19, 13, 0),

  }, {
    id: 3,
    title: 'Compost',
    startDate: new Date(2022, 8, 18, 14, 30),
    endDate: new Date(2022, 8, 18, 15, 30),
   
  }, {
    id: 4,
    title: 'Pruning',
    startDate: new Date(2022, 8, 7, 12, 0),
    endDate: new Date(2022, 8, 7, 13, 35),
    rRule: 'FREQ=MONTHLY;BYDAY=TU;UNTIL=20220801',
    exDate: '20240710T080000Z,20180724T080000Z',
  }, 
  {
    id: 5,
    title: 'Weeding Flowerbeds',
    startDate: new Date(2022, 8, 7, 12, 0),
    endDate: new Date(2022, 8, 7, 13, 35),
    rRule: 'FREQ=MONTHLY;BYDAY=TH;UNTIL=20240727',
    exDate: '20240705T090000Z,20180719T090000Z',
    ownerId: 5,
  },
  {
    id: 6,
    title: 'Fungicide',
    startDate: new Date(2022, 8, 9, 13, 0),
    endDate: new Date(2022, 8, 9, 14, 0),
    rRule: 'FREQ=YEARLY;BYDAY=FR;UNTIL=20220816',
    exDate: '20240713T100000Z,20180727T100000Z',
  }, 
  {
    id: 2,
    title: 'Harvest Sweetcorn',
    startDate: new Date(2022, 8, 21, 12, 0),
    endDate: new Date(2022, 8, 23, 13, 0),

  },
  {
    id: 5,
    title: 'Weeding Vegetables',
    startDate: new Date(2022, 8, 10, 12, 0),
    endDate: new Date(2022, 8, 10, 13, 35),
    rRule: 'FREQ=MONTHLY;BYDAY=10TH;UNTIL=20240727',
    exDate: '20240705T090000Z,20180719T090000Z',
    ownerId: 5,
  },
];


  //add user
   const owners = [
    


     /* API.getUser()
      .then(res => res.json())
    */
  ];



const WeatherIcon = ({ id }) => {
  switch (id) {
    case 0:
      return <StyledOpacity className={classes.rain} fontSize="large" />;
    case 1:
      return <StyledWbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};

// #FOLD_BLOCK
const CellBase = React.memo(({
  startDate,
  formatDate,
  otherMonth,
  // #FOLD_BLOCK
}) => {
  const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };
  return (
    <StyledTableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.rainBack]: iconId === 0,
        [classes.sunBack]: iconId === 1,
        [classes.cloudBack]: iconId === 2,
        // [classes.opacity]: otherMonth,
      })}
    >
      <StyledDivContent className={classes.content}>
        <WeatherIcon classes={classes} id={iconId} />
      </StyledDivContent>
      <StyledDivText className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </StyledDivText>
    </StyledTableCell>
  );
});

const TimeTableCell = (CellBase);

const Appointment = (({ ...restProps }) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = (({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = (({ ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      {/* <YardIcon fontSize="large" htmlColor="#FF7043" /> */}
      {/* <Typography variant="h5" style={{ marginLeft: '10px' }}>Peas By Spring</Typography> */}
    </div>
  </StyledToolbarFlexibleSpace>
));


const AddEventForm =(({ ...restProps }) =>(
                <div>
    	            <Typography align="left" variant="h4" sx={{
						        mt: 2,
                    ml: 3,
						        fontFamily: 'Satisfy',
						        fontSize: { xs: '1rem', md: '2rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black' 
						      }}>Add Event</Typography>
                    <form onSubmit={handleAddEvent} autoComplete="on" style={{width: '50%',backgroundColor: '#ffffff77', display:'flex', flexDirection:'column', justifyContent:'center',marginLeft: 15}}>
                      <TextField required className="outlined-required" label="Title" fullWidth margin="dense" size="small" name="title" />
                      <TextField required className="outlined-required" label="Start" fullWidth margin="dense" size="small" name="start" />
                      <TextField required className="outlined-required" label="End" fullWidth margin="dense" size="small" name="end" />
                      <div className="cardAction">
                        <Button type="submit" size="small" sx={{fontWeight: "bold", fontFamily:'montserrat'}}>Submit</Button>
                      </div>
                    </form>

                </div>            
            

));


// function handleAddEvent(e){
//   e.preventDefault();

//   let rawData = new FormData(e.target);
//   let data = {}
//   for (let [key, value] of rawData.entries())
//     data[key] = value;

//     return API.eCalls(data)
// 		.then(res => res.json())
// }

function handleAddEvent(e){
  e.preventDefault();

  let rawData = new FormData(e.target);
  let data = {}
  for (let [key, value] of rawData.entries())
    data[key] = value;
eCalls(data)
}

export default class Demo extends React.PureComponent {
  // #FOLD_BLOCK
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }


 

  // #FOLD_BLOCK
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Typography align="center" variant="h4" sx={{
						        mt: 2,
						        fontFamily: 'Satisfy',
						        fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black' 
						      }}>My Calendar</Typography>
       {/* <AddEventForm /> */}
        <Scheduler
          data={data}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate="2022-09-07"
          />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
            sx={{
              m: 2,
            }}
          />
          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
       
          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          />
          <DateNavigator />
          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
