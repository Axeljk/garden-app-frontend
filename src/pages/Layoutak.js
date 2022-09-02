import React, {useState, useEffect} from 'react'

import Grid from '@mui/material/Grid';
import './Layout.css'
import GridLines from 'react-gridlines';
import veggie from '../assets/Plants/Tomato_je.jpg'





function Layoutak() {



  const[squareBeingDragged,setSquareBeingDragged] = useState(null);
  const[squareBeingReplaced,setSquareBeingReplaced] = useState(null);
 
  const dragStart = (e) =>{
    console.log("drag Start ");
    console.log(e.target);
    setSquareBeingDragged(e.target)
  }
  
  const dragDrop = (e) =>{
    console.log("drag Drop");
    setSquareBeingReplaced(e.target)
  }
  
  const dragEnd = (e) =>{
    console.log("drag End ");
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
  
  
    console.log("square being dragged", squareBeingDraggedId)
    console.log("square being replaced", squareBeingReplacedId)
  }
  





    return (
      <div className="layout-container">
         <Grid container spacing={2}>
        <Grid item xs={8}>
        <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} >
          <div className='layout-div'></div>
        </GridLines>
        </Grid>
        <Grid item xs={4}>
        <div className='images-div'><h1>Select the Plant</h1>
        <img 
    key='19'
    src= {veggie}  data-id='19'
    draggable={true}
    onDragStart={dragStart}
    onDragOver={(e)=> e.preventDefault()}
    onDragEnter={(e)=> e.preventDefault()}
    onDragLeave={(e)=> e.preventDefault()}
    onDrop={dragDrop}
    onDragEnd={dragEnd}
    />
        </div>

        </Grid>
        </Grid>
      
   
       
      </div>
    );
  }
  
  export default Layoutak;