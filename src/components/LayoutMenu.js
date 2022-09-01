// Speed dial itself.
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import LayoutSubmenu from "./LayoutSubmenu";
import NavBar from './NavBar'

export default function LayoutMenu() {
	const [submenu, setSubmenu] = React.useState(false);
	const toggleSubmenu = () => setSubmenu(!submenu);

	const actions = [
		{ icon: <HighlightOffIcon />, name: "Remove Plant", onClick: toggleSubmenu },
		{ icon: <EditIcon />, name: "Edit Plant", onClick: toggleSubmenu },
		{ icon: <AddIcon />, name: "Insert Plant", onClick: toggleSubmenu }
	];

	return (
		<>
			<SpeedDial ariaLabel="layout menu" sx={{ position: "absolute", bottom: 16, right: 16 }} icon={ <SpeedDialIcon /> }>
				{ actions.map(actions => (
					<SpeedDialAction key={actions.name} icon={actions.icon} tooltipTitle={actions.name} onClick={actions.onClick} />
				))}
			</SpeedDial>
			{ submenu ? <LayoutSubmenu open={submenu} bottom={96} right={96} /> : null }
		</>
	);
}