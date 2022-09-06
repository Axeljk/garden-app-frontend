import React, { useEffect, useState } from 'react'
import background from '../assets/pexels-markus-spiske-6278625.jpg'
import Collapse from '@mui/material/Collapse'
import ImageCard from '../components/ImageCard'
import cardInfo from '../static/cardInfo'
import Box from '@mui/material/Box'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import '../components/CardSpace.css'
import '../pages/LandingPage.css'
import IconButton from "@mui/material/IconButton";
import { Link as Scroll } from "react-scroll";
import { Card, Typography, CardContent } from '@mui/material'
import AboutSpace from '../components/AboutSpace'
import { breakpoints } from '@mui/system'

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
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            height: 'auto%',
            backgroundAttachment: 'fixed'
        }}>
            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedheight={50}
            >
                <div style={{alignItems:'center',fontSize: {xs: '.5rem',md:'2rem'}}} className='container'>
                    <h1 className="pageTitle">About Peas By Spring</h1>                
                    <Card sx={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        maxHeight: '400px',
                        m: 'auto',
                        border: 2,
                        borderColor: '#33b3ff',
                        boxShadow: 2,
                    }}>
                        <CardContent className='cardContainer'>
                            <Typography sx={{
                                fontFamily:'Montserrat',
                                maxHeight: '400px',
                                alignItems: 'center',
                                fontSize: {xs:'.9rem',md:'1.2rem'}
                            }}>
                                The idea for a garden planner concept came from one of our talented webdevs, Kit Williams, though we all have a passion for growing and building things. We wanted to be part of something special and this concept seemed ripe for exploring and stretching our developer skills while allowing us to explore a little more outside too. 
                                <br/>
                                <br/>
                                This app is free to use and we have plans for where it's headed in the future with ideas like journals, recommendations, and developing garden-adjacent skills like preserving.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Scroll to="how-to-use" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon sx={{ fontSize: "4rem" }} className="downArrow" />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
                <div>
                    <AboutSpace />
                </div>
        </div>
    )
}