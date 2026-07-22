import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {

    const[stats, setStates] = useState(true);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                const result = await api.get("/tasks/dashboard");
                setStates(result.data.result);
                //console.log(result.data)

            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            } 
             setLoading(false);
        }
        getStats();

    },[]);

    if(loading){
        return<h2>Loading the Dashboard</h2>
    }

    return (
        <div>
            <h1>DashBoard</h1>
            <p>Welcome to the Dashboard</p>

            <div>
                <h3>total Tasks</h3>
                <p>{stats.total}</p>
            </div>

            <div>
                <h3>Pending Tasks</h3>
                <p>{stats.pending}</p>
            </div>
            
            <div>
                <h3>In Progress</h3>
                <p>{stats.inProgress}</p>
            </div>

            <div>
                <h3>Completed Tasks</h3>
                <p>{stats.completed}</p>
            </div>

            <div>
                <h3>Overdue Tasks</h3>
                <p>{stats.overdue}</p>
            </div>
        </div>
    )
}

export default Dashboard;