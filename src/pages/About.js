import React, { useEffect, useState } from 'react'
import background from '../assets/pexels-markus-spiske-6278625.jpg'
import Collapse from '@mui/material/Collapse'
import ImageCard from '../components/ImageCard'
import cardInfo from '../static/cardInfo'
import Box from '@mui/material/Box'
import '../components/CardSpace.css'
import { Card, Typography, CardContent } from '@mui/material'

export default function About() {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <div 
        style={{ 
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeate: 'no-repeat',
            maxHeight: '100%'
        }}>
            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedheight={50}
            >
                <div style={{alignItems:'center'}}>
                    <h1 className="pageTitle">About Peas By Spring</h1>
                    <Card sx={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        maxHeight: '400px',
                        m: 'auto'
                    }}>
                        <CardContent className='cardContainer'>
                            <Typography sx={{
                                fontFamily:'Montserrat',
                                maxHeight: '400px',
                                alignItems: 'center'
                            }}>
                        The idea for a garden planner concept came from one of our talented webdevs, Kit Williams. We all wanted to be part of something special and this concept seemed ripe for exploring and stretching our developer skills. This app is free to use and we have plans for where it's headed in the future with ideas like journals, recommendations, and developing garden-adjacent skills like preserving.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <Box className='cardContainer' sx={{
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    flexDirection: {
                        xs: 'column',
                        md: 'row'
                    }
                }}>
                    <ImageCard info={cardInfo[2]} checked={checked}/>
                    <ImageCard info={cardInfo[3]} checked={checked}/>
                    <ImageCard info={cardInfo[4]} checked={checked}/>
                    <ImageCard info={cardInfo[5]} checked={checked}/>
                </Box>
            </Collapse>
        </div>
    )
}