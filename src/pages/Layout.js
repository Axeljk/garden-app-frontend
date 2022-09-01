import React, {useState, useEffect} from 'react'
//CSS for Garden Layout
import './Layout.css'
import { Grid } from '@mui/material';
import veggie from '../assets/Plants/Tomato_je.jpg'
import soil1 from '../assets/Plants/soil1.jpg'



//Layout defiing the dimensions ganden landscape with display properties
const Layout = () => {
  const [dimensionx, setDimensionx] = useState(0);
  const [dimensiony, setDimensiony] = useState(0);
  const [garden, setGarden] = useState([]);

  const[squareBeingDragged,setSquareBeingDragged] = useState(null);
  const[squareBeingReplaced,setSquareBeingReplaced] = useState(null);
  const[soilImg,setSoilImg] = useState(soil1);

  const box1 = {
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
    let id=1;
    for (let i=0;i<dimensionx;i++){
      let temp = [];
      for (let j=0;j<dimensiony;j++){
          temp.push(<img style={box1} key={id} src={soilImg}  data-id={id} draggable={true}
            onDragStart={dragStart}
            onDragOver={(e)=> e.preventDefault()}
            onDragEnter={(e)=> e.preventDefault()}
            onDragLeave={(e)=> e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}></img>);
            id++;
      }
      arr.push(temp);
    }
    setGarden(arr);
  }


  useEffect(()=>{
    makeGardenLayout();
  },[dimensionx,dimensiony])

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
<Grid container spacing={3}>
<Grid item xs={6}>
    <>Images section
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
    /></>
  </Grid>
  
  <Grid item xs="auto" className='garden-layout'>
    <>
        <div className='app'>
          <div className='board'>
          <span>N x N Garden Layout</span>
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=> setDimensionx(e.target.value)} />
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensiony(e.target.value)} />
          <section style={gardenLayout}  onDragStart={dragStart}
    onDragOver={(e)=> e.preventDefault()}
    onDragEnter={(e)=> e.preventDefault()}
    onDragLeave={(e)=> e.preventDefault()}
    onDrop={dragDrop}
    onDragEnd={dragEnd}>
        {garden}
      </section>

          </div>

        </div>
        
        </>
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


