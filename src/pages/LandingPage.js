import React, {useEffect,useState} from 'react'
import './LandingPage.css';
import background from '../assets/pexels-gary-barnes-6231990.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { Link as Scroll } from 'react-scroll'
import Collapse from '@mui/material/Collapse'
import ImageCard from '../components/ImageCard'
import cardInfo from '../static/cardInfo'
import CardSpace from '../components/CardSpace'
import Ticker from 'react-ticker'
import Container from '@mui/material/Container'

function LandingPage() {

  const [checked,setChecked] = useState(false);
  useEffect(()=>{
      setChecked(true);
  },[]);


  return (
    
    <div 
        style={{ 
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeate: 'no-repeat',
            height: '100vh'
        }}>
      <Ticker offset='run-in' speed={10} mode='smooth'>
        {({ index }) => (
          <>
            <h3>This is the ticker for element #{index}!</h3>
          </>
        )}
      </Ticker>  
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className='container'>
          <h1 className='pageTitle'>Welcome, Gardener</h1>
          <Scroll to='how-to-use' smooth={true}>
            <IconButton>
              <ExpandMoreIcon sx={{ fontSize: '4rem' }} className='downArrow'/>
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
        <div >
            <CardSpace/>
        </div>
    </div>
  );
}

export default LandingPage;
