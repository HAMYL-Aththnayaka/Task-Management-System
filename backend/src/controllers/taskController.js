const { getTasksByUserId, getTaskByTaskId, createTask, updateTask, deleteTask } = require("../models/taskModel");
const validateTask = require("../utils/validateTask");


//create
const addTask = async (req, res) => {
    try {
        const { title, description, priority, status, due_date } = req.body;
        const userId = req.user.id;

        const validationChecks = validateTask({ title, priority, status, due_date });
        if (validationChecks) {
            return res.status(400).json({
                message: validationChecks
            });
        }

        const task = await createTask({
            title,
            description,
            priority,
            status,
            due_date,
            user_id: userId
        });

        return res.status(201).json({
            message: "Task Created Successfully",
            task
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

//get by user id
const fetchTasksByUserId = async (req, res) => {
    try {

        const userId = req.user.id;
        const tasks = await getTasksByUserId(userId);

        return res.status(200).json({
            tasks: tasks
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

//get by task id
const fetcheTasksByTaskId = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        const theTask = await getTaskByTaskId(taskId, userId);
        if (!theTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        return res.status(200).json({
            task: theTask
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
}

const updateTasks = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        const { title, description, priority, status, due_date } = req.body;

        // (put) so all will need change
        const validationChecks = validateTask({ title, priority, status, due_date });
        if (validationChecks) {
            return res.status(400).json({
                message: validationChecks
            });
        }

        const data = { title, description, priority, status, due_date }
        const result = await updateTask(taskId, userId, data);

        if (!result) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        return res.status(200).json({
            message: "Updated",
            UpdatedTask: result
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

const deleteTasks = async (req, res) => {

    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        if (!taskId) {
            return res.status(400).json({
                message: "Provide a TaskId"
            })
        }

        const result = await deleteTask(taskId, userId);
        if (!result) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task Removed Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        });
    }
}


module.exports = { addTask, fetchTasksByUserId, fetcheTasksByTaskId, updateTasks ,deleteTasks};