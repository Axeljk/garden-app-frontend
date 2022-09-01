import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Navigate } from "react-router-dom";
import "./login.css";

export default function Login(props) {
	function handleSubmit(event) {
		event.preventDefault();
		props.handleLogin("You'll never see this.", event.target[0].value, event.target[2].value);
		(<Navigate to="/" />)
	}

	return (
		<div className="heroContainer" sx={{}}>
			<Card variant="outlined" sx={{maxWidth:350, boxShadow: 8}}>
				<CardContent>
					<Typography align="center" variant="h4" sx={{mb: 1}}>Log in</Typography>
					<form onSubmit={handleSubmit} autoComplete="on">
						<TextField required className="outlined-required" label="Email" fullWidth margin="dense" size="small" name="email" />
						<TextField required className="outlined-required" type="password" fullWidth label="Password" margin="dense" size="small" sx={{mb:2}} name="password" />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
						</div>
					</form>
					<Typography variant="body2" sx={{color: "error.dark", fontWeight: "bold"}}></Typography>
				</CardContent>
			</Card>
			<Card variant="outlined" sx={{maxWidth:350, width: "100%", boxShadow: 8}}>
				<CardActions className="signupContainer">
					<Typography>Don't have an account?&nbsp;</Typography>
					<Link href="/signup" key="signup" underline="hover" sx={{fontWeight: "bold"}}>Sign up</Link>
				</CardActions>
			</Card>
		</div>
	);
}