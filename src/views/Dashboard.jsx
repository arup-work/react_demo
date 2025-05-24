import { useSelector } from "react-redux";
import Navbar from "./layouts/Navbar";

const Dashboard = () => {
    const auth = useSelector(state => state.auth.auth);
    return (
        <>
            <Navbar />
            <h1>Welcome back, {auth.user.firstName}!</h1>
        </>
    )
}

export default Dashboard;