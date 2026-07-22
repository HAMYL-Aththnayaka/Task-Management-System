const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { addTask, fetchTasksByUserId, fetcheTasksByTaskId,
    updateTasks, deleteTasks, dashboardStats, searchTaskFilter } = require("../controllers/taskController");

//dashboard
router.get('/tasks/dashboard', authMiddleware, dashboardStats);

//searcn
router.get("/tasks/search", authMiddleware, searchTaskFilter);

//tasks
router.get("/tasks", authMiddleware, fetchTasksByUserId);
router.get("/tasks/:id", authMiddleware, fetcheTasksByTaskId);
router.post("/tasks", authMiddleware, addTask);
router.put("/tasks/:id", authMiddleware, updateTasks);
router.delete("/tasks/:id", authMiddleware, deleteTasks);



module.exports = router;