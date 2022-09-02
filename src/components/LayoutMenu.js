// Speed dial itself.
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 400,
	width: "100%",
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

export default function LayoutMenu() {
	const [removePlantState, setRemovePlant] = React.useState(false);
	const toggleRemovePlant = () => setRemovePlant(!removePlantState);
	const [editPlantState, setEditPlant] = React.useState(false);
	const toggleEditPlant = () => setEditPlant(!editPlantState);
	const [createPlantState, setCreatePlant] = React.useState(false);
	const toggleCreatePlant = () => setCreatePlant(!createPlantState);
	const [editLayoutState, setEditLayout] = React.useState(false);
	const toggleEditLayout = () => setEditLayout(!editLayoutState);
	const [createLayoutState, setCreateLayout] = React.useState(false);
	const toggleCreateLayout = () => setCreateLayout(!createLayoutState);

	const actions = [
		{ icon: <HighlightOffIcon />, name: "Remove Plant", color: "#FF3347", onClick: toggleRemovePlant },
		{ icon: <EditIcon />, name: "Edit Plant", color: "#33FFEB", onClick: toggleEditPlant },
		{ icon: <AddIcon />, name: "Insert Plant", color: "#ADFF33", onClick: toggleCreatePlant },
		{ icon: <HistoryEduIcon />, name: "Edit Layout", color: "#F1FF33", onClick: toggleEditLayout },
		{ icon: <ReceiptIcon />, name: "New Layout", color: "#69FF33", onClick: toggleCreateLayout }
	];

	return (
		<>
			<SpeedDial ariaLabel="layout menu" sx={{ position: "absolute", bottom: 16, right: 16 }} FabProps={{ sx: { backgroundColor: "#8533FF", '&:hover': { bgcolor: "lightsalmon" }}}} icon={ <SpeedDialIcon /> }>
				{ actions.map(actions => (
					<SpeedDialAction key={actions.name} icon={actions.icon} tooltipTitle={actions.name} onClick={actions.onClick} sx={{backgroundColor: actions.color}} />
				))}
			</SpeedDial>

			{/* Create new layout modal. */}
			<Modal
				open={createLayoutState}
				onClose={toggleCreateLayout}
				aria-labelledby="create layout"
				aria-describedby="form to create new layout"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{mb: 2}}>Create New Layout</Typography>
					<form onSubmit={toggleCreateLayout} autoComplete="on">
						<TextField required className="outlined-required" label="layout name" fullWidth margin="dense" name="name" />
						<TextField required className="outlined-required" type="number" label="height" fullWidth margin="dense" name="height" sx={{width: "45%", mr: 2 }} />
						<TextField required className="outlined-required" type="number" fullWidth label="width" margin="dense" name="width" sx={{width: "45%", ml:2 }} />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Edit layout modal. */}
			<Modal
				open={editLayoutState}
				onClose={toggleEditLayout}
				aria-labelledby="edit layout"
				aria-describedby="form to edit your layout"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{mb: 2}}>Edit Layout</Typography>
					<form onSubmit={toggleEditLayout} autoComplete="on">
						<TextField required className="outlined-required" label="layout name" fullWidth margin="dense" name="name" value="Bob's Garden" />
						<TextField required className="outlined-required" type="number" label="height" fullWidth margin="dense" name="height" sx={{width: "45%", mr: 2 }} value={4} />
						<TextField required className="outlined-required" type="number" fullWidth label="width" margin="dense" name="width" sx={{width: "45%", mb:2, ml:2 }} value={8} />
						<Select label="direction" name="direction" value="N" >
							<MenuItem value="N">N</MenuItem>
							<MenuItem value="E">E</MenuItem>
							<MenuItem value="S">S</MenuItem>
							<MenuItem value="W">W</MenuItem>
						</Select>
						<Typography display="inline" sx={{ml: 19}}>Current: </Typography><Switch label="current" defaultChecked />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
						</div>
					</form>
				</Card>
			</Modal>

			{/* Create new plant modal. */}
			<Modal
				open={createPlantState}
				onClose={toggleCreatePlant}
				aria-labelledby="create layout"
				aria-describedby="form to create new layout"
			>
				<Card sx={style}>
					<Typography align="center" variant="h4" sx={{mb: 2}}>Add New Plant</Typography>
					<form onSubmit={toggleCreatePlant} autoComplete="on">
						<Select label="species" name="species" value="species" fullWidth >
							<MenuItem value="N">Lots</MenuItem>
							<MenuItem value="E">of</MenuItem>
							<MenuItem value="S">Stuff</MenuItem>
						</Select>
						<TextField className="outlined-required" label="plant name" fullWidth margin="dense" name="plant" />
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
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
					<Typography align="center" variant="h4" sx={{mb: 2}}>Edit Plant</Typography>
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
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Submit</Button>
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
					<Typography align="center" variant="h4" sx={{mb: 2}}>Remove Plant</Typography>
					<form onSubmit={toggleRemovePlant} autoComplete="on">
						<Select label="plant" name="plant" value="plant" fullWidth >
							<MenuItem value="N">All</MenuItem>
							<MenuItem value="E">of</MenuItem>
							<MenuItem value="S">Your</MenuItem>
							<MenuItem value="S">Plants</MenuItem>
						</Select>
						<Divider sx={{mt: 2, mb: 1}} />
						<div className="cardAction">
							<Button type="submit" size="small" sx={{fontWeight: "bold"}}>Remove</Button>
						</div>
					</form>
				</Card>
			</Modal>
		</>
	);
}