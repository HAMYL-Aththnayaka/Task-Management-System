import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { toast } from "react-toastify";

import "../styles/navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const logoutHandle = () => {
        try {
            const result = logout();

            if (result) {
                toast.success("Logged out successfully");
                navigate("/")
            }
        } catch (err) {
            toast.error("Error occured Durring logout")
            console.log(err);
        }
    }

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <h2 className="navbar-title">
                    Task Manager
                </h2>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/tasks">My Tasks</Link>
                    <Link to="/tasks/create">Create Task</Link>

                    <button onClick={logoutHandle}>
                        Logout
                    </button>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;