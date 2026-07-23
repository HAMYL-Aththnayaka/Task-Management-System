export const validateTask = (task) => {

    if (!task.title.trim()) {
        return "Title is required";
    }

    if (!task.priority) {
        return "Priority is required";
    }

    if (!task.status) {
        return "Status is required";
    }

    if (!task.due_date) {
        return "Due date is required";
    }

    const today = new Date().toISOString().split("T")[0];

    if (task.due_date < today) {
        return "Due date cannot be before today";
    }

    return "";
};

export default validateTask