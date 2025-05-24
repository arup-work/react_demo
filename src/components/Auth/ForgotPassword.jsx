import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
    const [formData, setFormdata]= useState({
        email: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormdata({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {

    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="formBox">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <FormGroup>
                <FormControl sx={{ marginTop: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        margin="normal"
                    />
                </FormControl>
            </FormGroup>
            <Button variant="contained" color="primary" fullWidth type="submit">Send password reset link</Button>
            <Typography sx={{ marginTop: 2 }} textAlign="center">
                <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                >
                    Login
                </Link>
            </Typography>
        </Box>
    )
}

export default ForgotPassword;