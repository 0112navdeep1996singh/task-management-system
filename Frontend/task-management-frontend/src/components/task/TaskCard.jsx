import { useState, useEffect } from "react";
import TaskStatusDropdown from "./TaskStatusDropdown";
import { deleteTask, updateTask } from "../../api/taskApi";
import { getAllUsers } from "../../api/userApi";
import { useAuth } from "../../auth/AuthContext";
import styles from "../../css/TaskCard.module.css";

const TaskCard = ({ task, onUpdate, isAdmin }) => {
  const { user } = useAuth();
  const currentUserId = Number(user?.id || 0);
  const isOwner = Number(task.assignedUserId) === currentUserId;

  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]); 

  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate || "",
    assignedUserId: task.assignedUserId || "",
  });

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task.id, editForm);
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Error updating task");
    }
  };

  return (
    <>
      {!isEditing ? (
        <tr className={styles.row}>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.priority}</td>
          <td>{task.dueDate || "-"}</td>
          <td>{task.assignedUsername || "-"}</td>

          <td>
            {isAdmin ? (
              task.status || "TODO"
            ) : (
              <TaskStatusDropdown
                taskId={task.id}
                currentStatus={task.status}
                onSuccess={onUpdate}
                disabled={!isOwner}
              />
            )}
          </td>

          {isAdmin && (
            <td className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this task?")) {
                    try {
                      await deleteTask(task.id);
                      onUpdate();
                    } catch (err) {
                      console.error("Delete failed", err);
                      alert("Error deleting task");
                    }
                  }
                }}
              >
                Delete
              </button>
            </td>
          )}
        </tr>
      ) : (
        <tr className={styles.editRow}>
          <td colSpan={isAdmin ? 7 : 6}>
            <form onSubmit={handleEditSubmit} className={styles.editForm}>
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
              />
              <select
                name="priority"
                value={editForm.priority}
                onChange={handleEditChange}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
              <input
                type="date"
                name="dueDate"
                value={editForm.dueDate}
                onChange={handleEditChange}
              />
              <select
                name="assignedUserId"
                value={editForm.assignedUserId}
                onChange={handleEditChange}
                required
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
              </select>

              <div className={styles.editButtons}>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
};

export default TaskCard;