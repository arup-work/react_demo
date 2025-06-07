import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthService from "../../services/AuthService";

const ForgotPassword = () => {
    const [formData, setFormdata]= useState({
        email: ''
    });
    const [errors, setErrors] = useState({});
    const navigate  =  useNavigate();

    const handleChange = (e) => {
        setFormdata({...formData, [e.target.name]: e.target.value})
    }

    const validateForm = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Email is required'
        }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        setErrors(errors);
        return !Object.keys(errors).length;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await AuthService.forgetPassword(formData.email);
            
            navigate('/', {
                state: {
                    message: response.message,
                    type: "success"
                }
            })
            
            
        }
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