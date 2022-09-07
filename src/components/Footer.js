import React from 'react'
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <footer style={{backgroundColor: '#8533ff'}}>
            <Typography align="center" variant="h4" sx={{
						mt: 2,
						fontFamily: 'Satisfy',
						fontSize: '1.3rem',
              			color: '#ffffff',
                        mb: 2
						}}>Grown with love from the Peas By Spring Team</Typography>
        </footer>
    )
}