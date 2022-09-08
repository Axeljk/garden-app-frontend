
import React from 'react'
import ImageCard from '../components/ImageCard'
import cardInfo from '../static/cardInfo'
import useWindowPosition from '../hook/useWindowPosition'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import '../components/CardSpace.css'

export default function CardSpace() {
    const checked = useWindowPosition('header');
    return (
        <Container id='how-to-use' className='cardContainer' maxWidth="xl" sx={{
            minHeight: '100%',

        }}>
            <Grid container spacing={2} rowSpacing={{xs:4, md:12}} justifyContent="space-around" sx={{ mt: 2 }}>
                <Grid item xs={10} md={5}>
                    <ImageCard info={cardInfo[2]} checked={checked}/>
                </Grid>
                <Grid item xs={10} md={5}>
                    <ImageCard info={cardInfo[3]} checked={checked}/>
                </Grid>
                <Grid item xs={10} md={5}>
                    <ImageCard info={cardInfo[4]} checked={checked}/>
                </Grid>
                <Grid item xs={10} md={5}>
                    <ImageCard info={cardInfo[5]} checked={checked}/>
                </Grid>
            </Grid>
        </Container>
    )
}