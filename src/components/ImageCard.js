import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'

const classes = {
    root: {
        maxWidth: 650,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
    },
    media: {
        height: 550
    },
    title: {
        fontFamily: 'Satisfy',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    desc: {
        fontFamily: 'Halant',
        fontSize: '1rem',
        color: 'white',
        height: 100
    }
}

export default function ImageCard({ info,checked }) {
    return (
        <Collapse in={checked} {...(checked ? {timeout:1000} : {})}>
            <Card sx={{
                maxWidth: '650px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: 2,
                borderColor: '#33b3ff',
                boxShadow: 2,
            }}>
                <CardActionArea href={info.href} target={info.target}>

                <CardMedia
                    component="img"
                    height="140"
                    image={info.imageUrl}
                    alt="developer headshot"
                    style={classes.media}
                    elevation={1}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={classes.title}>
                        {info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={classes.desc}>
                        {info.description} 
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{info.link1}</Button>
                    <Button size="small">{info.link2}</Button>
                </CardActions>
                </CardActionArea>
            </Card>
        </Collapse>
    )
}