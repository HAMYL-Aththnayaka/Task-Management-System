const db = require("../config/db");

const createTask = async (task) => {
    const result = await db.query(
        `INSERT INTO tasks(title,description,priority,status,due_date,user_id)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            task.title,
            task.description,
            task.priority,
            task.status,
            task.due_date,
            task.user_id
        ]
    );
    return result.rows[0];
};

const getTasksByUserId = async (userId) => {
    const result = await db.query(`
        SELECT * FROM tasks
        WHERE user_id =$1
        ORDER BY created_at DESC`,
        [userId],
    );
    return result.rows;
};

const getTaskByTaskId =async(taskId,userId)=>{
    const result = await db.query(
        `SELECT * FROM tasks WHERE id=$1 AND user_id=$2`,
        [taskId,userId]
    );
    return result.rows[0];
}

const updateTask = async(taskId,user_id,data)=>{
    const result = await db.query(`
        UPDATE tasks
        SET 
            title=$1,
            description=$2,
            priority=$3,
            status=$4,
            due_date=$5,
            updated_at=CURRENT_TIMESTAMP
        WHERE id=$6 AND user_id=$7
        RETURNING *
        `,
        [data.title,data.description,data.priority,data.status,data.due_date,taskId,user_id]
    );
    return result.rows[0];
}

const deleteTask = async(taskId , userId)=>{
    const result = await db.query(`
            DELETE FROM tasks
            WHERE id=$1 AND user_id=$2
            RETURNING *
        `,[taskId,userId]);

    return result.rows[0];
}


module.exports = {createTask,getTasksByUserId,getTaskByTaskId,updateTask,deleteTask};