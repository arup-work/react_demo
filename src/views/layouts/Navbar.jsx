import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (e) =>{
        // e.preventDefault();
        dispatch(authActions.logout());
        navigate('/',{
            state: {
                message: 'You have successfully logout!',
                type: 'success'
            }
        });

    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MyApp
                    </Typography>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
