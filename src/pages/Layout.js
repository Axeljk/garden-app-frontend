import React, {useState, useEffect} from 'react'
import '../components/style/layout.css'


const Layout = () => {
  const [dimensionx, setDimensionx] = useState(0);
  const [dimensiony, setDimensiony] = useState(0);
  const [garden, setGarden] = useState([]);

  const box1 = {
    width:"50px",
    height:"50px",
    backgroundColor:'#4a2f26'
  }
  const box2 = {
    width:"50px",
    height:"50px",
    backgroundColor:'#452a22'
  }
  const gardenLayout = {
    width:50*dimensionx,
    display:'flex',
    flexWrap:'wrap',
    marginTop:"20px",
    boxShadow:`0px 10px 10px rgba(0,0,0,0.1)`
  }

  const makeGardenLayout = ()=>{
    let arr = [];

    for (let i=0;i<dimensiony;i++){
      let temp = [];
      for (let j=0;j<dimensionx;j++){
        if ((i+j)%2)
          temp.push(<div style={box1}></div>);
        else  
          temp.push(<div style={box2}></div>)
      }
      arr.push(temp);
    }

    setGarden(arr);
  }

  useEffect(()=>{
    makeGardenLayout();
  })

  return (
    <div className='garden'>
      
      <div>
        <h2>
          <span>N x N </span> 
          Garden Layout
        </h2>
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensionx(e.target.value)} />
        <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensiony(e.target.value)} />
      </div>

      <section style={gardenLayout}>
        {garden}
      </section>

    </div>
  )
}

export default Layout;