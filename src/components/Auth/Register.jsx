import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../../assets/styles/Auth.css";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const errors = {};
        if (!formData.name) {
            errors.name = "Name is required";
        } else if (formData.name.length < 5) {
            errors.name = "Name should be minimum 5 characters";
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

        return errors;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Validate input before submitting
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="formBox">
            <Typography variant="h4" gutterBottom>
                Registration form
            </Typography>
            <FormGroup>
                <FormControl sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
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
        </Box>
    )
}

export default Register;