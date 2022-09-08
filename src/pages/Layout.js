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
import LayoutMenu from "../components/LayoutMenu";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import API from "../utils/API";
import { Stack } from "@mui/system";

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
      plant: plantCopied._id,
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
    boxShadow: `0px 10px 10px rgba(0,0,0,0.3)`,
    borderStyle: "none",
    outline: "none",
    borderWidth: 0,
    objectFit: 'cover'
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

		if (gardenData.specimens) {
			for (let i = 0; i < gardenData.width * gardenData.height; i++) {
				if (gardenData.specimens[i] != null) {
					console.log("PlantData:", plantData)
					console.log("PlantID:", gardenData.specimens[i].plant);
					let plant = plantData.find(plant => plant._id == gardenData.specimens[i].plant);
					let plantImg = (plant) ? plant.imgLink : soilImg;
					let plantName = (plant) ? plant.name : "plant";

					arr.push(
						<Tooltip key={i} title={
							<Box>
								<Typography>Nickname: {gardenData.specimens[i].name}</Typography>
								<Typography>I am a {plantName}.</Typography>
							</Box>
						}>
              <Box style={box1}>
                <img
                  src={plantImg}
                  style={{borderRadius:'12px',width:'100%',height:'100%', objectFit:'cover'}}
                  sx={{ borderRadius: '16px' }}
                  key={i}
                  data-id={gardenData.specimens[i]._id}
                  data-i={i}
                  draggable={true}
                  onDragStart={dragStart}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                  />
              </Box>
						</Tooltip>
					);
				} else {
					arr.push(
						<img
							style={box1}
							sx={{ border: 0 }}
							key={i}
							data-id={i}
							data-i={i}
							draggable={true}
							onDragStart={dragStart}
							onDragOver={(e) => e.preventDefault()}
							onDragEnter={(e) => e.preventDefault()}
							onDragLeave={(e) => e.preventDefault()}
							onDrop={dragDrop}
							onDragEnd={dragEnd}
						/>
					);
				}
			}

			setGarden(arr);
		}
	};

  useEffect(() => {
    makeGardenLayout();
  }, [gardenData, plantData]);

  return (
    <Container
      maxWidth="xl"
      sx={{ boxShadow: 4, height: "100%" }}
      className="background"
    >
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ mx: 12 }}>
            <Typography align="center" variant="h4" sx={{
              // mt: 2,
              fontFamily: 'Satisfy',
              fontSize: { xs: '2rem', md: '3rem' },
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
            sx={{
              width: '100%',
            }}
          >
            <Container
              sx={{
                height: '550px',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                backgroundColor: '#ffffff44',
              }}
            >
              <Box style={gardenLayout}>{garden}</Box>
            </Container>
          </GridLines>
        </Grid>
        <Grid item xs={12}>
            <Box>
                <Typography align="center" variant="h4" sx={{
                  fontFamily: 'Satisfy',
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: '#33D6FF',
                  textShadow: '2px 2px black',
                  position: 'relative',
                  }}>
                  Greenhouse
                </Typography>
            </Box>
            <Box
            sx={{
              display: "flex",
              justifyContent: 'center',
              flexDirection: "row",
              flexWrap: 'no-wrap',
              alignContent: "end",
              overflowX: 'auto',
              overflowY: 'hidden'
            }}
          >
            <Box sx={{
              display: "flex",
              justifyContent: 'center',
              flexDirection: "row",
              flexWrap: 'no-wrap',
              alignContent: "end",
              overflowX: 'auto',
              overflowY: 'hidden'
            }}>
              <Divider sx={{ mb: 1 }} />
              <ImageList cols={12} rowHeight={100} sx={{
                height: "100%",
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                flexDirection: 'row',
                overflow: 'auto'
              }} >
                {plantData.map((item, index) => (
                  <Tooltip title={<Typography align="center">
						{plantData[index].name}
					</Typography>}>
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
                        data-id={item._id}
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
                          width: "96px",
                          objectFit: "cover",
                        }}
                        />
                    </Box>
                  </ImageListItem>
				  </Tooltip>
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
