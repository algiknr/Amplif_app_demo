import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "@mui/material/MenuItem";
import {AccountCircle} from "@mui/icons-material";
import {Button, Menu} from "@mui/material";
import {Image, withAuthenticator} from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export const SiteHeader= ({username}) =>{

   // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

   /* const handleChange = (event) => {
        setAuth(event.target.checked);
    };*/

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width:"100%" }}>
            <AppBar  sx={{ bgcolor: "orange" }} position="static">
                <Toolbar>
                    <Image width={50} height={50}
                        alt="logo"
                        src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        &nbsp; Give Me Movie
                    </Typography>
                    <div>{username.attributes.email}</div>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>My Movie List</MenuItem>
                        </Menu>
                        <Button variant='filled' onClick={signOut}> Log Out</Button>

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default withAuthenticator(SiteHeader);