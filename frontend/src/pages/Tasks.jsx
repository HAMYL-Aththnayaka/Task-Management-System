import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios"

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const getTasks = async () => {
            try {
                const result = await api.get('/tasks');
                setTasks(result.data.tasks);
                //  console.log(result.data.tasks)
            } catch (err) {
                console.log(err?.response?.data?.message || err.message);
            }
            setLoading(false);
        }
        getTasks();
    }, []);

    if (loading) {
        return <h2>Loading the Tasks</h2>
    }

    const deleteHandle = async (id) => {
        try {
            const confirmDelete = window.confirm("Delete this task?");

            if (!confirmDelete) {
                return;
            }
            const result = await api.delete(`/tasks/${id}`);
            if (result) {
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }
    const handleEdit = (id) => {
        try {
            navigate(`/tasks/edit/${id}`);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (<div>
        <h2>My tasks</h2>
        {tasks.length === 0 ? (
            <p>You have 0 tasks </p>
        ) : (
            tasks.map((task) => (
                <div key={task.id}>
                    <h3>
                        {task.title}
                    </h3>
                    <p>{task.description}</p>
                    <p>Priority : {task.priority}</p>
                    <p>Status :{task.status}</p>
                    <p>Due Date : {task.due_date}</p>
                    <br />
                    <button onClick={() => handleEdit(task.id)}>
                        Edit Task
                    </button>
                    <button onClick={() => deleteHandle(task.id)}>
                        Delete
                    </button>
                    <hr />
                </div>
            ))
        )}
    </div>)
}

export default Tasks;