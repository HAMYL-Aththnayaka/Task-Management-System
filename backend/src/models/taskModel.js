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


//dashboard
const getTaskStats = async (userId) =>{
    const result = await db.query(`
        SELECT
            COUNT(*) AS total,
            COUNT(CASE WHEN status = 'Pending' THEN 1 END) AS pending,
            COUNT(CASE WHEN status = 'In Progress' THEN 1 END) AS "inProgress",
            COUNT(CASE WHEN status = 'Completed' THEN 1 END) AS completed,
            COUNT(CASE WHEN due_date < CURRENT_DATE AND status != 'Completed' THEN 1 END) AS overdue
            FROM tasks WHERE user_id = $1
        `,[userId]);

        return result.rows[0];
}

const searchTasks = async (userId, filters) => {

    const result = await db.query(`
        SELECT *
        FROM tasks
        WHERE user_id = $1
        AND ($2::text IS NULL OR title ILIKE $2)
        AND ($3::text IS NULL OR status = $3)
        AND ($4::text IS NULL OR priority = $4)
        ORDER BY
        CASE WHEN $5 = 'newest' THEN created_at END DESC,
        CASE WHEN $5 = 'oldest' THEN created_at END ASC,
        CASE WHEN $5 = 'dueDate' THEN due_date END ASC
    `,
    [
        userId,
        filters?.title ? `%${filters.title}%` : null,
        filters?.status ?  filters.status : null,
        filters?.priority ? filters.priority: null,
        filters?.sort ? filters.sort : null
    ]);

    return result.rows;
};

module.exports = {createTask,getTasksByUserId,getTaskByTaskId,updateTask,deleteTask,getTaskStats,searchTasks};

