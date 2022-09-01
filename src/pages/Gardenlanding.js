import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { margin } from '@mui/system';
import small from '../assets/Plants/small.png'
import large from '../assets/Plants/large.png'
import medium from '../assets/Plants/medium.png'
import custom from '../assets/Plants/custom.png'





export default function SimplePaper() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh", margin: "30px" }}>
          <div>
            <h1>Create your first Garden Plan </h1>
            <h3>
              Plans can contain several beds, containers and other objects -
              it's an area in the garden you are planning, like a piece of paper
              you are drawing on. You can resize it and create plans for other
              areas later if needed.
            </h3>
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
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Small</h1>
                  <h4>12' x 12'</h4>
                  <h4>(3.6m x 3.6m)</h4>
                  <img src={small} />
                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Medium</h1>
                  <h4>24' x 24'</h4>
                  <h4>(7m x 7m)</h4>
                  <img src={medium} />
                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Large</h1>
                  <h4>48' x 48'</h4>
                  <h4>(14m x 14m)</h4>
                  <img src={large} />
                </Stack>
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography>
                <Stack spacing={2} textAlign="center">
                  <h1>Medium</h1>
                  <h4>3'3 x 1000'</h4>
                  <h4>(1m x 300m)</h4>
                  <img src={custom} />
                </Stack>
              </Typography>
            </Paper>
            </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
