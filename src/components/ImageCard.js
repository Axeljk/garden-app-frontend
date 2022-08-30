import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const classes = {
    root: {
        maxWidth: 650,
        background: 'rgba(0,0,0,0.5)'
    },
    media: {
        height: 450
    },
    title: {
        fontFamily: 'Satisfy',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    description: {
        fontFamily: 'Halant',
        fontSize: '1rem'
    }
}

export default function ImageCard({ about,usage }) {
    return (
        <Card style={classes.root}>
            <CardMedia
                component="img"
                height="140"
                image={about.imageUrl}
                alt="green iguana"
                style={classes.media}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={classes.title}>
                    {about.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={classes.description}>
                    {about.desc} 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}