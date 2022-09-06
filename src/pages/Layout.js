
import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import './Layout.css'
import GridLines from 'react-gridlines';
import soilImg from '../assets/Plants/soil1.jpg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import LayoutMenu from "../components/LayoutMenu";
import LayoutPicker from "../components/LayoutPicker";
import { Typography } from '@mui/material';
import API from "../utils/API";

function Layout(props) {
	// States used for the page.
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
	const [gardenData, setGardenData] = useState({ name: `${props.user.username}'s Garden`, height: 4, width: 4});
	// Start page with the user's last garden or a default one.
	useEffect(() => {
		API.getUser(props.user.id)
		.then(user => user.json())
		.then(user => {
			// If they have Garden(s), check for any current and use the last one.
			if (user.gardens.length) {
				const gardensCurrent = user.gardens.filter(e => e.current == true);
				if (gardensCurrent.length > 0)
					return gardensCurrent[gardensCurrent.length - 1];
			}
			let newGarden = gardenData;
			newGarden.userId = props.user.id;
			setGardenData(newGarden);
			return API.saveNewGarden(gardenData).then(res => res.json());
		}).then(gardenNew => setGardenData(gardenNew))
		.catch(err => console.error(err));
	}, []);
	useEffect(() => { console.log(gardenData) }, [gardenData]);
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
		.catch(err => console.error(err));
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
 *	*	specimenData contains all of the info on all of the Specimen used by the Garden.
	 *	Its structure reflects an array of the Garden model in the backend server.
 *============================================================================*
 */
const addNewSpecimen = async (event) => { //pass in event.target
  event.preventDefault();
  return API.addSpecimen(event.target, props.garden)
  .then(res => res.json())
  .then(data => {
    props.setGardenData(props.gardenData.concat([data]));
  })
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
      addNewSpecimen();
    }

    const box1 = {
		width:"100px",
		height:"100px",
		backgroundImage: `url(${soilImg})`,
		padding: "10px 10px",
		boxShadow:`0px 10px 10px rgba(0,0,0,0.1)`,
		borderStyle: "none",
		outline: "none",
		borderWidth: 0
    }
    const box2 = {
      width:"100px",
      height:"100px",

    }
    const gardenLayout = {
      width:100*(gardenData.width ? gardenData.width : 4),
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
        let row = [];
        for (let j=0;j<gardenData.height;j++){
            row.push(<img style={box1} sx={{border: 0}} key={i+j} data-id={id} draggable={true}
              onDragStart={dragStart}
              onDragOver={(e)=> e.preventDefault()}
              onDragEnter={(e)=> e.preventDefault()}
              onDragLeave={(e)=> e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}></img>);
              id++;
        }
        arr.push(row);
      }

      setGarden(arr);
    }

    useEffect(()=>{
      makeGardenLayout();
    },[gardenData])




      return (
        <div className="layout-container">
			<Typography align="center" variant="h4">{gardenData.name}</Typography>
          <Grid container spacing={2}>
          <Grid item xs={8}>
          <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} >
            <div className='layout-div'> <section style={gardenLayout} >
          {garden}
        </section></div>
          </GridLines>
          </Grid>
          <Grid item xs={4}>
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
	  {/* <LayoutPicker /> */}
	  <LayoutMenu user={props.user} plantData={plantData} setPlantData={setPlantData} gardenData={gardenData} setGardenData={setGardenData} />
      </div>

      );
    }
    export default Layout;