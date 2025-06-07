import { Box, Button, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { ToastContainer } from "react-toastify";

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isValidToken, setIsValidToken] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await AuthService.resetPassword(token, formData.password);
            navigate('/', {
                state: {
                    message: response.message,
                    type: "success"
                }
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.password) {
            errors.password = "This field is required"
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "This field is required"
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Password & confirm password must be same"
        }

        setErrors(errors);

        return !Object.keys(errors).length;
    }

    const validateToken = async () => {
        const response = await AuthService.validateResetToken(token);
        if (response.valid) {
            setIsValidToken(true)
        } else {
            setIsValidToken(false)
        }

        // if (token) {
        //     validateToken();
        // } else {
        //     setIsValidToken(false);
        // }
    }

    useEffect(() => {
        validateToken();
    }, [token])

    return (
        <Box component="form" onSubmit={handleSubmit} className="formBox">
            <ToastContainer />
            {isValidToken && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Reset Password
                    </Typography>
                    <FormGroup>
                        <FormControl sx={{ marginTop: 2 }}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                margin="normal"
                                type="password"
                                id="password"
                            />
                        </FormControl>
                        <FormControl sx={{ marginTop: 2 }}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                margin="normal"
                                type="password"
                                id="confirmPassword"
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" fullWidth type="submit">Reset Password</Button>
                    </FormGroup>
                </>
            )}
            {!isValidToken && (
                <>
                    <Typography variant="h4" gutterBottom>
                        This token is expired
                    </Typography>
                </>
            )} 
            <Typography sx={{ marginTop: 2 }} textAlign="center">
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                >
                    Login
                </Link>
            </Typography>     

        </Box>
    )
}

export default ResetPassword;