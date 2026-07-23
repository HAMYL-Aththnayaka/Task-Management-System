import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from '../components/Navbar.jsx';
import { toast } from 'react-toastify';

import validateTask from '../utils/TaskValidation.js'

import "../styles/forms.css";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const today = new Date().toISOString().split("T")[0];

    const [task, setTask] = useState({
        title: '',
        description: "",
        priority: "Medium",
        status: "Pending",
        due_date: "",
    });

    useEffect(() => {
        const getTask = async () => {
            try {
                const result = await api.get(`/tasks/${id}`);

                if (result) {
                    const taskData = result.data.task;

                    setTask({
                        ...taskData,
                        due_date: taskData.due_date.split("T")[0],
                    });
                }
            } catch (err) {
                const message = err.response?.data?.message || err.message;
                toast.error(message)
                //console.log(message);
            }
            setIsLoading(false);
        };

        getTask();
    }, [id]);

    const handleChange = (e) => {
        try {
            setTask({ ...task, [e.target.name]: e.target.value });
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            toast.error(message)
            setError(message);

        }
    }

    const submithandle = async (event) => {
        event.preventDefault();
        const message = validateTask( task );
        if (message) {
            setError(message);
            toast.error(message)
            return;
        }
        try {
            const result = await api.put(`/tasks/${id}`, task);
            if (result) {
                toast.success("The Task Updated Successfully")
                navigate('/tasks');
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message;

            setError(message);
            toast.error(message);
        }
    }

    if (isLoading) {
        return <h2>Loading task...</h2>;
    };

    return (
        <div><Navbar />
            <div className="form-container">

                <h1>Edit Task</h1>
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={submithandle}>
                    <div className="form-group">
                        <label>Title :</label>
                        <input
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description :</label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            placeholder="describe the task"
                        />
                    </div>

                    <div className="form-group">
                        <label>Priority :</label>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status :</label>
                        <select
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Due Date :</label>
                        <input
                            type='date'
                            name='due_date'
                            value={task.due_date}
                            min={today}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">
                        Update Task
                    </button>

                </form>
            </div>
        </div>
    );

}

export default EditTask;