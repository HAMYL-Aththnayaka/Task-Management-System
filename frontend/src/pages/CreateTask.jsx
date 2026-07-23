import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

import { toast } from "react-toastify";

import { validateTask } from "../utils/TaskValidation.js";

const CreateTask = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const today = new Date().toISOString().split("T")[0];

    const [task, setCreateTask] = useState({
        title: '',
        description: "",
        priority: "Medium",
        status: "Pending",
        due_date: ""
    });

    const handleChange = (e) => {
        try {
            setCreateTask({
                ...task,
                [e.target.name]: e.target.value,
            });
        } catch (err) {
            console.log(err.message)
            toast.error(err.message)
        }
    }

    const submmitHanddle = async (event) => {
        event.preventDefault();

        const message = validateTask(task )
        if (message) {
            setError(message);
            toast.error(message);
            return;
        }
        //console.log(task)
        try {
            const result = await api.post("/tasks", task);
            if (result) {
                toast.success("Task created successfully");
                navigate('/tasks');
            }

        } catch (err) {
            const message = err.response?.data?.message || err.message;
            setError(message);
            toast.error(message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <h1>Create Task</h1>
                {error && <p>{error}</p>}
                <form className="task-form" onSubmit={submmitHanddle}>

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
                            min={today}
                            value={task.due_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="form-button" type="submit">
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;