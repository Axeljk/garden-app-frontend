import React from 'react'
import ImageCard from './ImageCard'
import cardInfo from '../static/cardInfo'
import useWindowPosition from '../hook/useWindowPosition'
import Box from '@mui/material/Box'
import '../pages/CardSpace.css'

export default function CardSpace() {
    const checked = useWindowPosition('header');
    return (
        <Box id='how-to-use' className='cardContainer' sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: {
                xs: 'column',
                md: 'row'
            },
            // maxWidth: {
            //     sm: 200,
            //     md: 450,
            //     lg: 650,
            // }
        }}>
            <ImageCard info={cardInfo[0]} checked={checked}/>
            <br/>
            <ImageCard info={cardInfo[1]} checked={checked}/>
        </Box>
    )
}