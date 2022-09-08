import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import "./login.css";

export default function Signup(props) {
	const [error, setError] = React.useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		const results = await props.handleSignup(event.target[0].value, event.target[2].value, event.target[4].value);

		if (results.token)
			window.location.replace("/");
		else
			setError(results.message);
	}

	return (
		<div className="heroContainer" sx={{}}>
			<Card variant="outlined" sx={{maxWidth:350, boxShadow: 8}}>
				<CardContent>
					<Typography align="center" variant="h4" sx={{mb: 1}}>Sign up</Typography>
					<Typography align="center" variant="subtitle1" sx={{mb: 1}}>Sign up to begin planning your garden.</Typography>
					<form onSubmit={handleSubmit} autoComplete="on">
						<TextField required className="outlined-required" label="Username" fullWidth margin="dense" size="small" name="username" />
						<TextField required className="outlined-required" label="Email" fullWidth margin="dense" size="small" name="email" />
						<TextField required className="outlined-required" type="password" fullWidth label="Password" margin="dense" size="small" sx={{mb:2}} name="password" />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
						</div>
					</form>
					<Typography variant="body2" sx={{color: "error.dark", fontWeight: "bold"}}>{error}</Typography>
				</CardContent>
			</Card>
			<Card variant="outlined" sx={{maxWidth:350, width: "100%", boxShadow: 8}}>
				<CardActions className="signupContainer">
					<Typography>Already have an account?&nbsp;</Typography>
					<Link href="/login" key="login" underline="hover" sx={{fontWeight: "bold"}}>Log in</Link>
				</CardActions>
			</Card>
		</div>
	);
}