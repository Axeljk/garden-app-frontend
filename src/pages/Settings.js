import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Settings() {

    return (
      <Box>
        <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Name" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Email" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Password" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Location" />
        </ListItem>
        </List>
      </Box>
    )
}