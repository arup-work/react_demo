import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"
import { useSelector } from "react-redux";
import Dashboard from "../views/Dashboard";
import ForgotPassword from "../components/Auth/ForgotPassword";

const AppRoutes = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/forgot-password"
                    element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />}
                />

                <Route
                    path="/dashboard"
                    element={!isAuthenticated ? <Login /> : <Dashboard />}
                />

            </Routes>
        </>
    )
}

export default AppRoutes;