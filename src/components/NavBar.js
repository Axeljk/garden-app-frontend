import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Menu from '@mui/material/Menu'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import './NavBar.css'

const pages = ['Login/Signup', 'About'];

export default function NavBar(props) {

    const navigate = useNavigate();
    const logMeOut = () => {
        props.logout();
        navigate('/')
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };

    return (
        <AppBar position='static' style={{ backgroundColor: '#8533ff' }} elevation={1} id='header'>
            <Container maxWidth='x1'>
                <Toolbar disableGutters>
                    {/* Collapses size on mobile to side-nav */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Login & About buttons */}
                    <Box sx={{ width: '50%', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/login' style={{textDecoration:'none'}}><Button
                                key='login'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Login/Signup
                        </Button></Link>
                        <Link to='/about' style={{textDecoration:'none'}}><Button
                        key='about'
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        About
                        </Button></Link>
                    </Box>
                    {/* Logo Header */}
                    <Typography
                        variant='h1'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            overflow: 'visible',
                            fontFamily: 'Satisfy',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '3rem'},
                            color: 'white',
                            textDecoration: 'none'
                        }}
                    >
                        Peas By Spring
                    </Typography>
                    {/* Avatar & Account dropdown */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Tool Shed">
                            {/* <Link to={`/users/$props.userId}`}> */}
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="user" src="/static/images/avatar/2.jpg">
                                        <HomeRepairServiceIcon/>
                                    </Avatar>
                                </IconButton>
                            {/* </Link> */}
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}></MenuItem>
                            <MenuItem component={Link} to='/layouts'>Layouts</MenuItem>
                            <MenuItem component={Link} to='/calendar'>Calendar</MenuItem>
                            <MenuItem component={Link} to='/settings'>Account Settings</MenuItem>

                            {/* {settings.map((setting) => (
                                
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

