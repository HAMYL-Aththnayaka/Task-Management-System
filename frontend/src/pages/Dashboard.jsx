import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from '../components/Navbar.jsx';
import { toast } from 'react-toastify'

import "../styles/dashboard.css";

const Dashboard = () => {

    const [stats, setStates] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            try {
                const result = await api.get("/tasks/dashboard");
                setStates(result.data.result);
                //toast.success("Tasks Loaded Successfully ")
                //console.log(result.data)

            } catch (err) {
                console.log(err.response?.data?.message || err.message);
                toast.error("Something went Wrong Could not Fetch the Tasks")
            }
            setLoading(false);
        }
        getStats();

    }, []);

    if (loading) {
        return <h2>Loading the Dashboard</h2>
    }

    return (

        <div>
            <Navbar />
            <div className="dashboard">
                <h1>DashBoard</h1>
                <p>Welcome to the Dashboard</p>

                <div className="stats-container">
                    <div className="stat-card">
                        <h3>Total Tasks</h3>
                        <p>{stats.total}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending Tasks</h3>
                        <p>{stats.pending}</p>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p>{stats.inProgress}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Completed Tasks</h3>
                        <p>{stats.completed}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Overdue Tasks</h3>
                        <p>{stats.overdue}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;