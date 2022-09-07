import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import "./Layout.css";
import GridLines from "react-gridlines";
import soilImg from "../assets/Plants/soil1.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import LayoutMenu from "../components/LayoutMenu";
import LayoutPicker from "../components/LayoutPicker";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/tooltip";
import API from "../utils/API";

function Layout(props) {
  // States used for the page.
  const [garden, setGarden] = useState([]);

  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  /*
   *============================================================================*
   *								  Axel's Garden								  *
   *============================================================================*
   */
  /*
   *	gardenData contains all of the info about the Garden.
   *	Its structure reflects the Garden model in the backend server.
   */
  const [gardenData, setGardenData] = useState({
    name: `${props.user.username}'s Garden`,
    height: 4,
    width: 4,
  });
  // Start page with the user's last garden or a default one.
  useEffect(() => {
    API.getUser(props.user.id)
      .then((user) => user.json())
      .then((user) => {
        // If they have Garden(s), check for any current and use the last one.
        if (user.gardens.length) {
          const gardensCurrent = user.gardens.filter((e) => e.current == true);
          if (gardensCurrent.length > 0)
            return gardensCurrent[gardensCurrent.length - 1];
        }
        let newGarden = gardenData;
        newGarden.userId = props.user.id;
        setGardenData(newGarden);
        return API.saveNewGarden(gardenData).then((res) => res.json());
      })
      .then((gardenNew) => setGardenData(gardenNew))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    console.log("Hey kid", gardenData);
  }, [gardenData]);
  const gardenCalls = {
    getGarden: async (gardenId) => {
      const user = await (await API.getUser(props.user.id)).json();
    },
  };
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
      .then((res) => res.json())
      .then((user) => plantCalls.getUserPlants(user.plants))
      .then((plants) => setPlantData(plants))
      .catch((err) => console.error(err));
  }, []);
  const plantCalls = {
    getUserPlants: async (plants) => {
      const allPlants = [];

      for (let i = 0; i < plants.length; i++) {
        await API.getPlant(localStorage.getItem("token"), plants[i])
          .then((res) => res.json())
          .then((data) => {
            allPlants.push(data);
          });
      }
      return allPlants;
    },
  };

  /*
   *============================================================================*
   *																			  *
   *============================================================================*
   */
  const dragStart = (e) => {
    console.log("drag Start ", e.target);
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("drag Drop e.target", e.target);
    //newSquare.setAttribute("data-plantid", garden._id);
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    squareBeingReplaced.src = squareBeingDragged.src;
    addNewSpecimen();
	console.log("Dropped");
  };

  /*
   *============================================================================*
   *	*	specimenData contains all of the info on all of the Specimen used by the Garden.
   *	Its structure reflects an array of the Garden model in the backend server.
   *============================================================================*
   */
  const addNewSpecimen = () => {

    let plantCopied = plantData.find(plant => plant._id == squareBeingDragged.dataset.id);
    const specimenData = {
      name: plantCopied.name,
      plantId: plantCopied._id,
      gardenId: gardenData._id,
	  index: squareBeingReplaced.dataset.i
    };

    return API.addSpecimen(specimenData)
      .then((res) => res.json())
      .then(specimen => {
		squareBeingReplaced.dataset.id = specimen._id;
		API.getGarden(gardenData._id)
			.then(res => res.json())
			.then(garden => setGardenData(garden));
	  });
  };

  const box1 = {
    width: "100px",
    height: "100px",
    backgroundImage: `url(${soilImg})`,
    padding: "10px 10px",
	boxShadow: `0px 10px 10px rgba(0,0,0,0.1)`,
    borderStyle: "none",
    outline: "none",
    borderWidth: 0,
  };
  const box2 = {
    width: "100px",
    height: "100px",
  };
  const gardenLayout = {
    width: 100 * (gardenData.width ? gardenData.width : 4),
    display: "grid",
    gridTemplateColumns: `repeat(${gardenData.width}, auto)`,
    marginTop: "20px",
    boxShadow: `0px 10px 10px rgba(0,0,0,0.1)`,
  };

  //Creating the actual layout with the user inputs
  const makeGardenLayout = () => {
    let arr = [];
    let id = 1;
    for (let i = 0; i < gardenData.width; i++) {
      let row = [];
      for (let j = 0; j < gardenData.height; j++) {
        row.push(
			// <Tooltip title={
			// 	<Box>
			// 		<Typography>Specimen</Typography>
			// 		<Typography>I am a tooltip</Typography>
			// 	</Box>
			// }>
          <img
            style={box1}
            sx={{ border: 0 }}
            key={id}
            data-id={id}
			data-i={id - 1}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
		//   </Tooltip>
        );
        id++;
        }
      arr.push(row);
    }

    setGarden(arr);
  };

  useEffect(() => {
    makeGardenLayout();
  }, [gardenData]);

  return (
    <Container
      maxWidth="xl"
      sx={{ boxShadow: 4, height: "100%" }}
      className="background"
    >
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mx: 12 }}>
            <Typography align="center" variant="h4" sx={{ 
				mt: 2,
				fontFamily: 'Satisfy',
				fontSize: { xs: '3rem', md:'4rem' },
				color: '#33D6FF',
				textShadow: '2px 2px black'
				}}>
              {gardenData.name}
            </Typography>
            <Typography align="center" variant="subtitle1">
              {gardenData.desciption}
            </Typography>
          </Box>
          <GridLines
            className="grid-area"
            cellWidth={100}
            strokeWidth={2}
            cellWidth2={25}
          >
            <Container
              sx={{
                minHeight: 600,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "scroll",
              }}
            >
              <Box style={gardenLayout}>{garden}</Box>
            </Container>
          </GridLines>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "end",
            }}
          >
            <Box>
              <Typography align="center" variant="h4" sx={{ 
				mt: 2,
				fontFamily: 'Satisfy',
				fontSize: { xs: '3rem', md:'4rem' },
				color: '#33D6FF',
				textShadow: '2px 2px black'
				}}>
                Greenhouse
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ImageList sx={{ height: "100%" }} cols={4} rowHeight={100}>
                {plantData.map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ height: 100, width: 100, padding: "2px" }}
                  >
                    <Box
                      sx={{
                        height: "96px",
                        width: "96px",
                        boxShadow: 4,
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        data-plantid={item._id}
                        data-name={item.name}
                        data-gardenid={gardenData._id}
                        src={`${item.imgLink}?w=100&h=100&fit=crop&auto=format`}
                        srcSet={`${item.imgLink}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        loading="lazy"
                        key="1"
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        style={{
                          height: "96px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <LayoutPicker /> */}
      <LayoutMenu
        user={props.user}
        plantData={plantData}
        setPlantData={setPlantData}
        gardenData={gardenData}
        setGardenData={setGardenData}
      />
    </Container>
  );
}
export default Layout;
