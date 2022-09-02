import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import small from '../assets/Plants/small.png'
import large from '../assets/Plants/large.png'
import medium from '../assets/Plants/medium.png'
import custom from '../assets/Plants/custom.png'
import videobg from '../assets/Plants/videoplayback.mp4'
import './Layout.css'



export default function SimplePaper() {
  
    const[usertext,setusertext]=useState();
    const[layoutDim,setLayoutDim]=useState();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {setOpen(true)
    console.log(e.target.outerText)
    if((e.target.outerText) === 'Select-Custom')
    {
        setusertext("Custom Layout")
        //setLayoutDim()
        console.log(usertext);
    } else
    if((e.target.outerText) === 'Select-Small')
    {
        setusertext("Small Layout")
        console.log(usertext);
        setLayoutDim(4,4);
 
    } else
    if((e.target.outerText) === 'Select-Medium')
    {
        setusertext("Medium Layout");
        setLayoutDim(6,6)
    } else
    if((e.target.outerText) === 'Select-Large')
    {
        setusertext("Large Layout")
        setLayoutDim(8,8)
    }




    if((e.target.outerText) === 'Select-Custom')
    {
        console.log("modal")
    }
    };
    const handleClose = () => setOpen(false);


    /*const handleClick = (e) => {
        console.info('You clicked the Chip. ', e.target);
        
        handleOpen(e.target);

    }*/
  
    return (
    
    <React.Fragment>
      <CssBaseline />
      <div className='main'>
        <video src={videobg} autoPlay loop muted />
       
       <div className='content'>
          <div className='heading'>
            <h1>Create your first Garden Plan </h1>
            <h3 className='paragraph'>
              Plants can contain several beds, containers and other objects -
              it's an area in the garden you are planning, like a piece of paper
              you are drawing on. You can resize it and create plans for other
              areas later if needed.
            </h3>
          </div>

          <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           You selected {usertext}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant="text">Continue</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 200,
                height: 300,
              },
            }}
          >
            <Paper elevation={3} >
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Small</h1>
                  <h4>12' x 12'</h4>
                  <h4>(3.6m x 3.6m)</h4>
                  
                  <div className="centerimg"> <img align="middle" src={small} height="45px" width="45px" /></div>

          
          <Chip className='small' label="Select-Small" variant="outlined" onClick={handleOpen} data-id="small" />
                 
                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Medium</h1>
                  <h4>24' x 24'</h4>
                  <h4>(7m x 7m)</h4>
                  <div className="centerimg"><img src={medium}  height="55px" width="55px"/></div>
                  <Chip className="medium" label="Select-medium" variant="outlined" onClick={handleOpen} />

                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Large</h1>
                  <h4>48' x 48'</h4>
                  <h4>(14m x 14m)</h4>
                  <div className="centerimg"><img src={large}  height="65px" width="65px"/></div>
                  <Chip className='large' label="Select-Large" variant="outlined" onClick={handleOpen} />

                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Custom</h1>
                  <h4>3'3 x 1000'</h4>
                  <h4>(1m x 300m)</h4>
                  <div className="centerimg"><img src={custom} className="center" height="65px" width="85px"/></div>
                  <Chip className='custom' label="Select-Custom" variant="outlined" onClick={handleOpen} />

                </Stack>
              </Typography>
            </Paper>
            </Box>
     
    </div>
    </div>
    </React.Fragment>
  );
}
