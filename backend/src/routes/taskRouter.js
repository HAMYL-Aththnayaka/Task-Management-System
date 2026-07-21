const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { addTask, fetchTasksByUserId, fetcheTasksByTaskId, updateTasks ,deleteTasks}= require("../controllers/taskController");

router.get("/tasks",authMiddleware,fetchTasksByUserId);
router.get("/tasks/:id",authMiddleware,fetcheTasksByTaskId);
router.post("/tasks",authMiddleware,addTask);
router.put("/tasks/:id",authMiddleware,updateTasks);
router.delete("/tasks/:id",authMiddleware,deleteTasks);


module.exports = router;