import * as React from 'react';
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import API from "../utils/API";

export default function Settings(props) {
	const [settingsUsername, setSettingsUsername] = React.useState("");
	const [settingsPassword, setSettingsPassword] = React.useState("");
	const [settingsCity, setSettingsCity] = React.useState("");
	const [settingsState, setSettingsState] = React.useState("");
	const [gardens, setGardens] = React.useState([]);

	React.useEffect(() => {
		const storedToken = localStorage.getItem("token");

		if (storedToken) {
			API.checkToken(storedToken).then(res => {
				if (!res.ok) {
					console.warn("Expired token.");
					localStorage.removeItem("token");
				} else {
					return res.json().then(data => {
						props.setUser({
							id: data.id,
							username: data.username,
							email: data.email
						});
					});
				}
			}).then(() => API.getUser(props.user.id))
			.then(res => res.json())
			.then(user => {
				setSettingsUsername(user.username);
				if (user.location?.city)
					setSettingsCity(user.location.city);
				if (user.location?.state)
					setSettingsState(user.location.state);
				setGardens(user.gardens?.map(e => e.name));
				return user;
			});
		}
	}, []);

	const handleProfileSubmit = event => {
		event.preventDefault();

		const data = {};
		data.location = {};
		if (settingsUsername)
			data.username = settingsUsername;
		if (settingsPassword)
			data.password = settingsPassword;
		if (settingsCity)
			data.location.city = settingsCity;
		if (settingsState)
			data.location.state = settingsState;
		API.editUser(props.user.id, data)
			.then(res => res.json())
			.then(() => {
				props.setUser({
					id: props.user.id,
					username: settingsUsername ? settingsUsername : props.user.username,
					email: props.user.email
				});
			});
	}

	return (
		<Container maxWidth="xl" sx={{ boxShadow: 4, height: "100%", backgroundColor: "#fff" }}>
			<Container maxWidth="md" sx={{ height: "100%" }}>
			<form onSubmit={handleProfileSubmit} autoComplete="on">
				<Box sx={{mx:12, mt:4}}>
					<Typography align="center" variant="h4" sx={{mt: 2}}>Your Account</Typography>
					<Divider sx={{mb: 2}} />
				</Box>
				<TextField className="filled-basic" label="username" fullWidth margin="dense" name="name" value={settingsUsername} onChange={e => setSettingsUsername(e.target.value)}/>
				<TextField className="filled-basic" type="password" label="password" fullWidth margin="dense" name="password" value={settingsPassword} onChange={e => setSettingsPassword(e.target.value)} />
				<TextField className="filled-basic" label="city" fullWidth margin="dense" name="city" value={settingsCity} onChange={e => setSettingsCity(e.target.value)} />
				<TextField className="filled-basic" label="state" fullWidth margin="dense" name="state" value={settingsState} onChange={e => setSettingsState(e.target.value)} />
				<Divider sx={{mt: 2, mb: 1}} />
				<div className="cardAction">
					<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
				</div>
			</form>
			<Box sx={{mx:12, mt:4}}>
				<Typography align="center" variant="h4" sx={{mt: 2}}>Your Gardens</Typography>
				<Divider sx={{mb: 2}} />
			</Box>
			<List sx={{maxHeight: "100px", overflow: "auto"}}>
				{gardens?.length > 0 &&
				gardens.map((garden, index) => (
					<ListItem key={index}>{garden || "[untitled]"}</ListItem>
				))}
			</List>
			<Box sx={{mx:12, mt:4}}>
				<Typography align="center" variant="h4" sx={{mt: 2}}>Your Plants</Typography>
				<Divider sx={{mb: 2}} />
			</Box>
			<List sx={{maxHeight: "100px", overflow: "auto"}}>
				<ListItem>Stuff</ListItem>
			</List>
			</Container>
		</Container>
	)
}