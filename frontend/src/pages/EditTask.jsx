import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

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
                console.log(err.response?.data?.message || err.message);
            }

            setIsLoading(false);
        };

        getTask();
    }, [id]);

    const handleChange = (e) => {
        try {
            setTask({ ...task, [e.target.name]: e.target.value });
        } catch (err) {
            setError(err.response?.data?.message || err.message);

        }
    }

    const submithandle = async (event) => {
        event.preventDefault();
        try {
            const result = await api.put(`/tasks/${id}`, task);
            if (result) {
                navigate('/tasks');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

    if (isLoading) {
        return <h2>Loading task...</h2>;
    };

    return (
        <div>
            <h1>Edit Task</h1>
            {error && <p>{error}</p>}
            <form onSubmit={submithandle}>
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
    );

}

export default EditTask;