import * as React from 'react';
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

export default function Settings() {

	return (
		<Container component="Box" maxWidth="md" sx={{ boxShadow: 4, height: "100%", backgroundColor: "primary.main", color: "primary.contrastText" }}>
			<form  autoComplete="on">
				<Box sx={{mx:12, mt:4}}>
					<Typography align="center" variant="h4" sx={{mt: 2}}>Your Account</Typography>
					<Divider sx={{mb: 2, backgroundColor: "primary.contrastText"}} />
				</Box>
				<TextField className="filled-basic" label="username" fullWidth margin="dense" name="name" sx={{backgroundColor: "primary.contrastText"}} />
				<TextField className="filled-basic" label="password" fullWidth margin="dense" name="name" sx={{backgroundColor: "primary.contrastText"}} />
				<TextField className="filled-basic" label="city" fullWidth margin="dense" name="name" sx={{backgroundColor: "primary.contrastText"}} />
				<TextField className="filled-basic" label="state" fullWidth margin="dense" name="name" sx={{backgroundColor: "primary.contrastText"}} />
				<Divider sx={{mt: 2, mb: 1, backgroundColor: "primary.contrastText"}} />
				<div className="cardAction">
					<Button type="submit" size="small" sx={{fontWeight: "bold", color: "primary.contrastText"}}>Submit</Button>
				</div>
			</form>
			<Box sx={{mx:12, mt:4}}>
				<Typography align="center" variant="h4" sx={{mt: 2}}>Your Gardens</Typography>
				<Divider sx={{mb: 2, backgroundColor: "primary.contrastText"}} />
			</Box>
			<List>
				<ListItem>Stuff</ListItem>
			</List>
			<Box sx={{mx:12, mt:4}}>
				<Typography align="center" variant="h4" sx={{mt: 2}}>Your Plants</Typography>
				<Divider sx={{mb: 2, backgroundColor: "primary.contrastText"}} />
			</Box>
			<List>
				<ListItem>Stuff</ListItem>
			</List>
		</Container>
	)
}