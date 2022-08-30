import React from 'react'
import './LandingPage.css';
import background from '../assets/pexels-gary-barnes-6231990.jpg'
import Ticker from 'react-ticker'

function LandingPage() {
  return (
    
    <div 
        style={{ 
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeate: 'no-repeat',
            width: '100w',
            height: '100vh'
        }}>
        {/* <Ticker>
            {({ index }) => (
            <>
                <h3>This is the ticker for element #{index}!</h3>
                <img src='src\assets\pexels-huy-phan-2987081.jpg' />
            </>
            )}
        </Ticker> */}
    </div>
  );
}

export default LandingPage;
