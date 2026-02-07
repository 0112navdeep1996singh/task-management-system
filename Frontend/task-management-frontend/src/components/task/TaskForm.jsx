import { useEffect, useState } from "react";
import { createTask } from "../../api/taskApi";
import { getAllUsers } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import styles from "../../css/TaskForm.module.css";

const TaskForm = ({ onCreated }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    assignedUserId: "",
    status: "TODO", 
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask(form);
      onCreated && onCreated();
      setForm({ title: "", description: "", priority: "MEDIUM", dueDate: "", assignedUserId: "", status: "TODO" });
      navigate("/tasks");
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Create Task</h3>
      <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required disabled={loading} />
      <textarea name="description" placeholder="Task Description" value={form.description} onChange={handleChange} disabled={loading} />
      <select name="priority" value={form.priority} onChange={handleChange} disabled={loading}>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} disabled={loading} />
      <select name="assignedUserId" value={form.assignedUserId} onChange={handleChange} required disabled={loading}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <div className={styles.buttons}>
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Task"}</button>
        <button type="button" onClick={() => navigate("/tasks")} className={styles.viewTasksButton} disabled={loading}>View Tasks</button>
      </div>
    </form>
  );
};

export default TaskForm;