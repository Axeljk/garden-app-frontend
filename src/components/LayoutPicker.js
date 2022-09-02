import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Picker(props) {
	return (
		<Box sx={{ maxHeight: 96, maxWidth: 96, height: "100%", width: "100%", position: "absolute", bottom: 32, left: 32 }}>
			<Paper elevation={12} sx={{height: "100%", width: "100%"}}>
				(Selected plant goes here)
			</Paper>
		</Box>
	);
}