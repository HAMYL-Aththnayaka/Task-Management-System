import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios"
import Navbar from '../components/Navbar.jsx';
import { toast } from 'react-toastify';

import "../styles/tasks.css";

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [sortBy, setSortBy] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const getTasks = async () => {
            try {
                const result = await api.get('/tasks');
                setTasks(result.data.tasks);
                //  console.log(result.data.tasks)
            } catch (err) {
                const message = err?.response?.data?.message || err.message;
                console.log(message);
                toast(message);
            }
            setLoading(false);
        }
        getTasks();
    }, []);


    const deleteHandle = async (id) => {
        try {
            const confirmDelete = window.confirm("Delete this task?");

            if (!confirmDelete) {
                return;
            }
            const result = await api.delete(`/tasks/${id}`);
            if (result) {
                setTasks(tasks.filter(task => task.id !== id));
                toast.success("item removed");
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            console.log(message);
            toast.error(message);
        }
    }

    const getFilteredTasks = () => {
        let result = [...tasks];

        if (search) {
            result = result.filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter) {
            result = result.filter(
                (task) => task.status === statusFilter
            );
        }

        if (priorityFilter) {
            result = result.filter(
                (task) => task.priority === priorityFilter
            );
        }

        if (sortBy === "newest") {
            result.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }

        if (sortBy === "oldest") {
            result.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
        }

        if (sortBy === "dueDate") {
            result.sort(
                (a, b) => new Date(a.due_date) - new Date(b.due_date)
            );
        }

        return result;
    };

    const handleEdit = (id) => {
        try {
            navigate(`/tasks/edit/${id}`);
        } catch (err) {
            console.log(err.message);
            toast.error("Error Occured")
        }
    }

    if (loading) {
        return <h2>Loading the Tasks</h2>
    }

    const filerTask = getFilteredTasks();

    return (
        <div>
            <Navbar />

            <div className="tasks-page">
                <h2>My tasks</h2>

                {tasks.length === 0 ? (
                    <p>You have 0 tasks</p>
                ) : (
                    <>
                        <div className="task-controls">
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <option value="">All Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">No Sorting</option>
                                <option value="newest">Newest Created</option>
                                <option value="oldest">Oldest Created</option>
                                <option value="dueDate">Due Date</option>
                            </select>
                        </div>

                        {filerTask.map((task) => (
                            <div className="task-card" key={task.id}>
                                <h3>{task.title}</h3>

                                <div className="task-info">
                                    <p>{task.description}</p>
                                    <p>Priority: {task.priority}</p>
                                    <p>Status: {task.status}</p>
                                    <p>Due Date: {task.due_date.split("T")[0]}</p>
                                </div>

                                <div className="task-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(task.id)}
                                    >
                                        Edit Task
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteHandle(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Tasks;