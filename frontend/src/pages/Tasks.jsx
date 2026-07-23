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


    const getFilteredTasks = async () => {
        try {
            const params = new URLSearchParams();
            if (search) {
                params.append("title", search);
            }

            if (statusFilter) {
                params.append("status", statusFilter);
            }

            if (priorityFilter) {
                params.append("priority", priorityFilter);
            }

            if (sortBy) {
                params.append("sort", sortBy);
            }

            let result;
            if (params.toString()) {
                result = await api.get(`/tasks/search?${params.toString()}`);
            } else {
                result = await api.get('/tasks');
            }

            setTasks(result.data.tasks);
        } catch (err) {
            const message = err?.response?.data?.message || err.message;
            console.log(message);
            toast(message);
        }
    };


    useEffect(() => {
        const loadTasks = async () => {
            await getFilteredTasks();
            setLoading(false);
        }
        loadTasks();
    }, []);


    useEffect(() => {
        getFilteredTasks();
    }, [search, statusFilter, priorityFilter, sortBy]);

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

                        {tasks.map((task) => (

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