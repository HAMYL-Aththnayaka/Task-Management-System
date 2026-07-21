 const validateTask= ({ title, priority, status, due_date }) => {
 // Requirement 
        if (!title || !priority || !status || !due_date) {
                return "Title, priority, status and due date are required"
        }

        // Due date 
        const today = new Date()
            .toISOString()
            .split("T")[0];
        if (due_date < today) {
                return "Due date cannot be earlier than today"
        }

        // Priority 
        const allowedPriority = [
            "Low",
            "Medium",
            "High"
        ];
        if (!allowedPriority.includes(priority)) {
                return "Invalid priority. Use Low, Medium or High"
        }

        // Status 
        const allowedStatus = [
            "Pending",
            "In Progress",
            "Completed"
        ];
        if (!allowedStatus.includes(status)) {
                return "Invalid status"
        }
        
        return null;
    }
module.exports = validateTask;