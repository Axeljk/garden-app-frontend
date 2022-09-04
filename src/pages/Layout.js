
  import React, {useState, useEffect} from 'react'
  import Grid from '@mui/material/Grid';
  import './Layout.css'
  import GridLines from 'react-gridlines';
  import soil1 from '../assets/Plants/soil1.jpg'
  import ImageList from '@mui/material/ImageList';
  import ImageListItem from '@mui/material/ImageListItem';
  import Stack from '@mui/material/Stack';
  import LayoutMenu from "../components/LayoutMenu";
  import LayoutPicker from "../components/LayoutPicker";
import API from "../utils/API";

  function Layout(props) {

    const itemData = [
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        maxHeight: '100px',
        maxWidth: '100px'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1920px-Patates.jpg',
        title: 'Potato',
        maxHeight: '100px',
        maxWidth: '100px'
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        maxHeight: '100px',
        maxWidth: '100px'
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
      },
    ];

    const [dimensionx, setDimensionx] = useState(0);
    const [dimensiony, setDimensiony] = useState(0);
    const[soilImg,setSoilImg] = useState(soil1);
    const [garden, setGarden] = useState([]);

    const[squareBeingDragged,setSquareBeingDragged] = useState(null);
    const[squareBeingReplaced,setSquareBeingReplaced] = useState(null);

/*
 *============================================================================*
 *								  Axel's Garden								  *
 *============================================================================*
 */
	/*
	 *	gardenData contains all of the info about the Garden.
	 *	Its structure reflects the Garden model in the backend server.
	 */
	const [gardenData, setGardenData] = useState({height: 3, width: 3});
	// Start page with the user's last garden or a default one.
	useEffect(() => {
		API.getUser(props.user.id)
		.then(user => user.json())
		.then(user => {
			// If they have Garden(s), check for any current and use the last one.
			if (user.gardens.length) {
				const gardens = user.gardens.filter(e => e.current == true);

				if (gardens.length)
					return gardens[gardens.length - 1];
			}
			return API.saveNewGarden(localStorage.getItem("token"), user);
		}).then(garden => setGardenData(garden))
		.catch(err => console.log(err));
	}, []);
	const gardenCalls = {
		getGarden: async (gardenId) => {
			const user = await (await API.getUser(props.user.id)).json();
		}
	}
/*
 *============================================================================*
 *								  Axel's Plants								  *
 *============================================================================*
 */
	/*
	 *	plantData contains all of the info on all of the Plants used by the user.
	 *	Its structure reflects an array of the Plant model in the backend server.
	 */
	 const [plantData, setPlantData] = useState([]);
	 useEffect(() => {
		API.getUser(props.user.id)
		.then(res => res.json())
		.then(user => plantCalls.getUserPlants(user.plants))
		.then(plants => setPlantData(plants))
		.catch(err => console.log(err));
	}, []);
	const plantCalls = {
		getUserPlants: async (plants) => {
			const allPlants = [];

			for (let i = 0; i < plants.length; i++) {
				await API.getPlant(localStorage.getItem("token"), plants[i])
					.then(res => res.json())
					.then(data => {
						allPlants.push(data);
					});
			}
			return allPlants;
		}
	}
/*
 *============================================================================*
 *																			  *
 *============================================================================*
 */

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
      squareBeingReplaced.src = squareBeingDragged.src;
    }

    const box1 = {
      width:"100px",
      height:"100px",

    }
    const box2 = {
      width:"100px",
      height:"100px",

    }
    const gardenLayout = {
      width:100*gardenData.width,
      display:'flex',
      flexWrap:'wrap',
      marginTop:"20px",
      boxShadow:`0px 10px 10px rgba(0,0,0,0.1)`
    }


    //Creating the actual layout with the user inputs
    const makeGardenLayout = ()=>{
      let arr = [];
      let id=1;
      for (let i=0;i<gardenData.width;i++){
        let temp = [];
        for (let j=0;j<gardenData.height;j++){
            temp.push(<img style={box1} key={i+j} src={soilImg}  data-id={id} draggable={true}
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
    },[gardenData])




      return (
        <div className="layout-container">
			<h1>NAEM OF GARDEN</h1>
          <Grid container spacing={2}>
          <Grid item xs={8}>
          <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} >
            <div className='layout-div'> <section style={gardenLayout} >
          {garden}
        </section></div>
          </GridLines>
          </Grid>
          <Grid item xs={4}>
          <div className='app'>
          <Stack spacing={2}>
            <span>N x N Garden Layout</span>
          <input type="number" placeholder='Enter the Dimension' onChange={(e)=> setDimensionx(e.target.value<20 ? e.target.value : 20)} />
          <input type="number" placeholder='Enter the Dimension' onChange={(e)=>setDimensiony(e.target.value)} />
          </Stack>
            </div>
          <div className='images-div'><h1>Select the Plant</h1>


  <ImageList sx={{ width: 400, height: "auto" }} cols={4} rowHeight={100}>
        {plantData.map((item, index) => (
          <ImageListItem key={index} className='imagesList'>
            <img
              src={`${item.imgLink}?w=100&h=100&fit=crop&auto=format`}
              srcSet={`${item.imgLink}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              key='1'
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e)=> e.preventDefault()}
              onDragEnter={(e)=> e.preventDefault()}
              onDragLeave={(e)=> e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          </ImageListItem>
        ))}
      </ImageList>
      </div>
      </Grid>
      </Grid>
	  <LayoutPicker />
	  <LayoutMenu user={props.user} plantData={plantData} setPlantData={setPlantData} />
      </div>

      );
    }
    export default Layout;