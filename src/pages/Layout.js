import React, {useState, useEffect} from 'react'
//CSS for Garden Layout
import './Layout.css'
import { Grid } from '@mui/material';
import reactRuler from 'react-ruler'
import veggie from '../assets/Plants/Tomato_je.jpg'
import soil1 from '../assets/Plants/soil1.jpg'
import soil2 from '../assets/Plants/soil2.jpg'

//Ruler for the garden landscape
const Ruler = reactRuler(React)


//Layout defiing the dimensions ganden landscape with display properties
const Layout = () => {
  const [dimensionx, setDimensionx] = useState(0);
  const [dimensiony, setDimensiony] = useState(0);
  const [garden, setGarden] = useState([]);

  const box1 = {
    width:"100px",
    height:"100px",
    
  }
  const box2 = {
    width:"100px",
    height:"100px",
   
  }
  const gardenLayout = {
    width:100*dimensionx,
    display:'flex',
    flexWrap:'wrap',
    marginTop:"20px",
    boxShadow:`0px 10px 10px rgba(0,0,0,0.1)`
  }


  //Creating the actual layout with the user inputs
  const makeGardenLayout = ()=>{
    let arr = [];

    for (let i=0;i<dimensionx;i++){
      let temp = [];
      for (let j=0;j<dimensiony;j++){
        if ((i+j)%2)
          temp.push(<img style={box1} key={i} src={soil1}></img>);
        else  
          temp.push(<img style={box2} key={i} src={soil1}></img>)
      }
      arr.push(temp);
    }

    setGarden(arr);
  }

  
  useEffect(()=>{
    makeGardenLayout();
  },[dimensionx,dimensiony])

  const dragStart = () =>{
    console.log("drag Start ");
  }

  const dragDrop = () =>{
    console.log("drag Drop");
  }
  
  const dragEnd = () =>{
    console.log("drag End ");
  }

  return (
<Grid container spacing={3}>
  <Grid item xs="auto" className='garden-layout'>
    <>
        <div className='app'>
          <div className='board'>
          <span>N x N Garden Layout</span>
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=> setDimensionx(e.target.value<20 ? e.target.value : 20)} />
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensiony(e.target.value)} />
          <section style={gardenLayout} >
        {garden}
        <Ruler orientation="horizontal" segments={20} segmentLength={50} />
      <Ruler orientation="vertical" segments={20} segmentLength={50}   />
      </section>

          </div>

        </div>
        
        </>
  </Grid>
  <Grid item xs={6}>
    <>Images section
    <img 
    key='1'
    src= {veggie}  data-id='1'
    draggable={true}
    onDragStart={dragStart}
    onDragOver={(e)=> e.preventDefault()}
    onDragEnter={(e)=> e.preventDefault()}
    onDragLeave={(e)=> e.preventDefault()}
    onDrop={dragDrop}
    onDragEnd={dragEnd}
    /></>
  </Grid>
  
</Grid>


/*
    <Container maxWidth="200">
    <div className='garden'>
      
      <div>
        <h2>
          <span>N x N </span> 
          Garden Layout
        </h2>
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=> setDimensionx(e.target.value<20 ? e.target.value : 20)} />
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensiony(e.target.value)} />
      </div>
     
      <section style={gardenLayout} >
        {garden}
        <Ruler orientation="horizontal" segments={20} segmentLength={50} />
      <Ruler orientation="vertical" segments={20} segmentLength={50}   />
      </section>
     

    </div>
    </Container>*/
  )
}

export default Layout;


