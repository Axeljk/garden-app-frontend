// Speed dial itself.
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Filter1Icon from '@mui/icons-material/Filter1';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Modal stuff.
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import Switch from "@mui/material/Switch";
import {Divider} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../components/LayoutMenu.css';
import API from '../utils/API';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 400,
	width: "100%",
	bgcolor: 'background.paper',
	boxShadow: 12,
	p: 4,
  };

export default function LayoutMenu(props) {
	// States used by menus. Beware.
	const [speedDial, setSpeedDial] = React.useState(false);
	const toggleSpeedDial = () => setSpeedDial(!speedDial);
	const [currentGarden, setCurrentGarden] = React.useState("");
	const [removePlantState, setRemovePlant] = React.useState(false);
	const toggleRemovePlant = () => setRemovePlant(!removePlantState);
	const [editPlantState, setEditPlant] = React.useState(false);
	const toggleEditPlant = () => setEditPlant(!editPlantState);
	const [createPlantState, setCreatePlant] = React.useState(false);
	const toggleCreatePlant = () => setCreatePlant(!createPlantState);
	const [removeGarden, setRemoveGarden] = React.useState(false);
	const toggleRemoveGarden = () => setRemoveGarden(!removeGarden);
	const [editLayoutState, setEditLayout] = React.useState(false);
	const toggleEditLayout = () => setEditLayout(!editLayoutState);
	const [createLayoutState, setCreateLayout] = React.useState(false);
	const toggleCreateLayout = () => setCreateLayout(!createLayoutState);
	const [gardenTab, setGardenTab] = React.useState(0);
	const handleGardenTab = (event, target) => setGardenTab(target);
	const [selectGarden, setSelectGarden] = React.useState(false);
	const toggleSelectGarden = () => setSelectGarden(!selectGarden);
	const [allGardens, setAllGardens] = React.useState([{name: "[none]"}]);

	React.useEffect(() => {
		API.getUser(props.user.id)
		.then(res => res.json())
		.then(user => {setAllGardens(user.gardens); return allGardens});
	}, [speedDial]);

	const actions = [
		{ icon: <HighlightOffIcon />, name: "Remove Plant", color: "#FF3347", onClick: toggleRemovePlant },
		{ icon: <EditIcon />, name: "Edit Plant", color: "#33FFEB", onClick: toggleEditPlant },
		{ icon: <AddIcon />, name: "Insert Plant", color: "#ADFF33", onClick: toggleCreatePlant },
		{ icon: <RemoveCircleOutlineIcon />, name: "Remove Garden", color: "#F8A477", onClick: toggleRemoveGarden },
		{ icon: <HistoryEduIcon />, name: "Edit Garden", color: "#77CBF8", onClick: toggleEditLayout },
		{ icon: <Filter1Icon />, name: "Select Garden", color: "#E577F8", onClick: toggleSelectGarden },
		{ icon: <ReceiptIcon />, name: "New Garden", color: "#8BF877", onClick: toggleCreateLayout }
	];
	const addNewPlant = async (event) => { //pass in event.target
		event.preventDefault();

		let rawData = new FormData(event.target);
		let data = {}
		for (let [key, value] of rawData.entries())
			data[key] = value;
		data.userId = props.user.id;
		data.imgLink = await API.getPlantImage(event.target[0].value);

		return API.addPlant(data, props.user.id)
		.then(res => res.json())
		.then(data => {
			toggleCreatePlant();
			props.setPlantData(props.plantData.concat([data]));
		})
	}
	const removeGardenClose = (event) => {
		event.preventDefault();
		toggleRemoveGarden();

		return API.deleteGarden(currentGarden, { userId: props.user.id})
			.then(() => {
				setCurrentGarden("");

				if (currentGarden == props.gardenData._id) {
					let gardens = allGardens.filter(e => e._id != currentGarden);

					if (gardens.length >= 1)
						return props.setGardenData(gardens[gardens.length - 1]);
					else {
						return API.saveNewGarden({ userId: props.user.id, name: `${props.user.username}'s Garden`, height: 4, width: 4})
							.then(res => res.json())
							.then(newGarden => props.setGardenData(newGarden));
					}
				}
			});
	}
	const editGardenClose = (event) => {
		event.preventDefault();

		const rawData = new FormData(event.target);
		//rawData.set("current", true);
		let data = {};
		for (let [key, value] of rawData.entries()) {
			data[key] = value;
		}
		delete data.current;

		return API.editGarden(data, props.gardenData._id)
			.then(res => res.json())
			.then(results => {
				toggleEditLayout();
				return props.setGardenData(results);
			});
	}
	const selectGardenClose = event => {
		event.preventDefault();
		toggleSelectGarden();

		return API.getGarden(currentGarden, localStorage.getItem("token"))
		.then(res => res.json())
		.then(garden => props.setGardenData(garden));
	}
	const duplicateGardenClose = event => {
		event.preventDefault();
		toggleCreateLayout();

		return API.getGarden(currentGarden, localStorage.getItem("token"))
			.then(res => res.json())
			.then(garden => {
				props.setGardenData(garden);
				let data = garden;
				delete data["_id"];
				data.userId = props.user.id;
				return API.saveNewGarden(data)
					.then(res => res.json());
			});
	}
	const createGardenClose = event => {
		event.preventDefault();

		const data = {
			name: event.target.name.value,
			height: event.target.height.value,
			width: event.target.width.value,
			userId: props.user.id
		}
		return API.saveNewGarden(data)
			.then(res => res.json())
			.then(results => {
				toggleCreateLayout();
				props.setGardenData(results);
			});
	}
	return (
		<>
			<SpeedDial ariaLabel="garden menu" onClick={toggleSpeedDial} open={speedDial} sx={{ position: "fixed", bottom: 16, right: 16 }} FabProps={{ sx: { backgroundColor: "#8533FF", '&:hover': { bgcolor: "lightsalmon" }}}} icon={ <SpeedDialIcon /> }>
				{ actions.map(actions => (
					<SpeedDialAction key={actions.name} icon={actions.icon} tooltipTitle={actions.name} onClick={actions.onClick} sx={{backgroundColor: actions.color}} />
				))}
			</SpeedDial>

			{/* Create new garden modal. */}
			<Modal
				open={createLayoutState}
				onClose={toggleCreateLayout}
				aria-labelledby="create garden"
				aria-describedby="form to create new garden"
				className='modalStyle'
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>New Garden</Typography>
					<Tabs value={gardenTab} onChange={handleGardenTab} aria-label="create or duplicate garden tabs">
						<Tab label="Create New" sx={{fontFamily:'Halant'}} />
						<Tab label="Duplicate" sx={{fontFamily:'Halant'}}/>
					</Tabs>
					<div hidden={gardenTab !== 0} id={0}>
						<form onSubmit={createGardenClose} autoComplete="on">
							<TextField required className="outlined-required" label="name of garden" fullWidth margin="dense" name="name" />
							<TextField required className="outlined-required" type="number" label="height" fullWidth margin="dense" name="height" sx={{width: "45%", mr: 2 }} />
							<TextField required className="outlined-required" type="number" fullWidth label="width" margin="dense" name="width" sx={{width: "45%", ml:2 }} />
							<Divider sx={{mt: 2, mb: 1}} />
							<div className="cardAction">
								<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
							</div>
						</form>
					</div>
					<div hidden={gardenTab !== 1} id={1}>
						<form onSubmit={duplicateGardenClose} autoComplete="on">
							<Select label="duplicate" name="duplicate" value={currentGarden} onChange={event => setCurrentGarden(event.target.value)} sx={{mt: 1}} fullWidth>
								{allGardens.map((garden, index) =>
									<MenuItem key={index} value={garden._id}>{garden.name}</MenuItem>
								)}
							</Select>
							<Divider sx={{mt: 2, mb: 1}} />
							<div className="cardAction">
								<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
							</div>
						</form>
					</div>
				</Card>
			</Modal>

			{/* Select garden modal. */}
			<Modal
				open={selectGarden}
				onClose={toggleSelectGarden}
				aria-labelledby="edit garden"
				aria-describedby="form to edit your garden"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Select Garden</Typography>
					<form onSubmit={selectGardenClose} autoComplete="on">
						<Select label="select" name="select" value={currentGarden} onChange={event => setCurrentGarden(event.target.value)} sx={{mt: 2}} fullWidth>
							{allGardens?.map((garden, index) =>
								<MenuItem key={index} value={garden._id}>{garden.name}</MenuItem>
							)}
						</Select>
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Edit garden modal. */}
			<Modal
				open={editLayoutState}
				onClose={toggleEditLayout}
				aria-labelledby="edit garden"
				aria-describedby="form to edit your garden"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Edit Garden</Typography>
					<form onSubmit={editGardenClose} autoComplete="on">
						<TextField required className="outlined-required" label="name of garden" fullWidth margin="dense" name="name" defaultValue={props.gardenData.name} />
						<TextField required className="outlined-required" type="number" label="height" fullWidth margin="dense" name="height" sx={{width: "45%", mr: 2 }} defaultValue={props.gardenData.height} />
						<TextField required className="outlined-required" type="number" fullWidth label="width" margin="dense" name="width" sx={{width: "45%", mb:2, ml:2 }} defaultValue={props.gardenData.width} />
						<Select label="direction" name="direction" defaultValue={props.gardenData.direction ? props.gardenData.direction : "N"} >
							<MenuItem value="N">N</MenuItem>
							<MenuItem value="E">E</MenuItem>
							<MenuItem value="S">S</MenuItem>
							<MenuItem value="W">W</MenuItem>
						</Select>
						<Typography display="inline" sx={{ml: 19}}>Current: </Typography><Switch label="current" name="current" defaultChecked={props.gardenData.current} />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Remove Garden modal. */}
			<Modal
				open={removeGarden}
				onClose={toggleRemoveGarden}
				aria-labelledby="remove garden"
				aria-describedby="form to remove a garden"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Remove Garden</Typography>
					<form onSubmit={removeGardenClose} autoComplete="on">
						<Select label="remove" name="remove" value={currentGarden} onChange={event => setCurrentGarden(event.target.value)} sx={{mt: 2}} fullWidth>
							{allGardens?.map((garden, index) =>
								<MenuItem key={index} value={garden._id}>{garden.name}</MenuItem>
							)}
						</Select>
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Create new plant modal. */}
			<Modal
				open={createPlantState}
				onClose={toggleCreatePlant}
				aria-labelledby="create plant"
				aria-describedby="form to create new plant"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Add New Plant</Typography>
					<form onSubmit={addNewPlant} autoComplete="on">
					<TextField className="outlined-required" label="Plant Name (e.g. Yukon Gold)" fullWidth margin="dense" name="name" />
						<TextField className="outlined-required" label="Type (e.g. Potato)" fullWidth margin="dense" name="type" />
						<TextField className="outlined-required" label="Grown Height" fullWidth margin="dense" name="height" />
						<TextField className="outlined-required" label="Grown Width" fullWidth margin="dense" name="width" />
						<TextField className="outlined-required" label="Time to Harvest/Bloom" fullWidth margin="dense" name="harvest" />
						<TextField className="outlined-required" label="Lifespan" fullWidth margin="dense" name="lifespan" />
						<TextField className="outlined-required" label="Hardiness Zone" fullWidth margin="dense" name="usda-zone" />
						<TextField className="outlined-required" label="Water Needed" fullWidth margin="dense" name="water" />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Edit plant modal. */}
			<Modal
				open={editPlantState}
				onClose={toggleEditPlant}
				aria-labelledby="create layout"
				aria-describedby="form to create new layout"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Edit Plant</Typography>
					<form onSubmit={toggleEditPlant} autoComplete="on">
						<Select label="plant" name="plant" value="plant" fullWidth >
							<MenuItem value="N">All</MenuItem>
							<MenuItem value="E">of</MenuItem>
							<MenuItem value="S">Your</MenuItem>
							<MenuItem value="S">Plants</MenuItem>
						</Select>
						<TextField className="outlined-required" label="plant name" fullWidth margin="dense" name="plant" />
						<TextField className="outlined-required" label="previous yield" fullWidth margin="dense" name="yield" />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Remove plant modal. */}
			<Modal
				open={removePlantState}
				onClose={toggleRemovePlant}
				aria-labelledby="remove plant"
				aria-describedby="form to remove plant"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{
						mb: 2,
						fontFamily: 'Satisfy',
						fontSize: { xs: '2rem', md: '3rem' },
              			color: '#33D6FF',
              			textShadow: '2px 2px black'
						}}>Remove Plant</Typography>
					<form onSubmit={toggleRemovePlant} autoComplete="on">
						<Select label="plant" name="plant" value="plant" fullWidth >
							<MenuItem value="N">All</MenuItem>
							<MenuItem value="E">of</MenuItem>
							<MenuItem value="S">Your</MenuItem>
							<MenuItem value="S">Plants</MenuItem>
						</Select>
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold",fontFamily:'montserrat'}}>Remove</Button>
						</div>
					</form>
				</Card>
			</Modal>
		</>
	);
}