import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AuthService from "../../services/AuthService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../helpers/utils/toastUtils";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        setErrors(errors);
        return !Object.keys(errors).length;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await AuthService.login(formData.email, formData.password)
        }
    }

    useEffect(() => {
        if (location.state && location.state.message) {
            if (location.state.type === "success") {
                showSuccessToast(location.state.message);
            } else {
                showErrorToast(location.state.message);
            }

            // Clear the state so it doesn't show again on refresh
            navigate(location.pathname, { replace: true });

        }
    }, [location.state, location.pathname, navigate]);

    return (
        <Box component="form" onSubmit={handleSubmit} className="formBox">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Login form
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
                <FormControl sx={{ marginTop: 2 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        margin="normal"
                    />
                </FormControl>
            </FormGroup>
            <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
            <Typography sx={{ marginTop: 2 }} textAlign="center">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                >
                    Register
                </Link>
            </Typography>
        </Box>
    )
}

export default Login;