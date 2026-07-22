import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';


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
        }
    }

    const submmitHanddle = async (event) => {
        event.preventDefault();
        console.log(task)
        try {

            const result = await api.post("/tasks", task);

            if (result) {
                navigate('/tasks');
            }

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

    return (
        <div>
            <h1>Create Task</h1>
            {error && <p>{error}</p>}
            <form onSubmit={submmitHanddle}>
                <div>
                    <label>Title :</label>
                    <input
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="describe the task"
                    />
                </div>

                <div>
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

                <div>
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

                <div>
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

                <button type="submit">
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default CreateTask;