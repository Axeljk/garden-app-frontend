import React, { useEffect, useState } from 'react'
import background from '../assets/pexels-pixabay-161512.jpg'
import Collapse from '@mui/material/Collapse'
import ImageCard from '../components/ImageCard'
import cardInfo from '../static/cardInfo'

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
            height: '100vh'
        }}>
            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedheight={50}
            >
                <div className="container">
                    <h1 className="pageTitle">About Peas By Spring</h1>
                </div>
                <div className='cardContainer' sx={{
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    m: '3%',
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
                </div>
            </Collapse>
        </div>
    )
}