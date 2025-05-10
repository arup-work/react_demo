import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../../assets/styles/Auth.css";
import AuthService from "../../services/AuthService";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = "First name is required";
        } else if (formData.firstName.length < 5) {
            errors.firstName = "First name should be minimum 5 characters";
        }
        if (!formData.lastName) {
            errors.lastName = "Last name is required";
        } else if (formData.lastName.length < 5) {
            errors.lastName = "Last name should be minimum 5 characters";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.password = "Password & confirm password must be same";
        }

        setErrors(errors);
        return !Object.keys(errors).length;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await AuthService.register(formData.firstName, formData.lastName, formData.email, formData.password);

            navigate('/',{
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
                Registration form
            </Typography>
            <FormGroup>
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        margin="normal"
                    />
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        margin="normal"
                    />
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
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
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        type="password"
                        helperText={errors.password}
                        margin="normal" />
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        type="password"
                        helperText={errors.confirmPassword}
                        margin="normal" />
                </FormControl>
            </FormGroup>
            <Button variant="contained" color="primary" fullWidth type="submit">Register</Button>
            <Typography sx={{ marginTop: 2 }} textAlign="center">
                Already have an account?{" "}
                <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                    Login
                </Link>
            </Typography>
        </Box>
    )
}

export default Register;