import { Route, Routes } from "react-router-dom"
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>
        </>
    )
}

export default AppRoutes;