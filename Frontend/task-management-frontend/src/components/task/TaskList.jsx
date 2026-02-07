import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";
import Loader from "../common/Loader";
import { getTasks } from "../../api/taskApi";
import { useAuth } from "../../auth/AuthContext";
import styles from "../../css/TaskList.module.css";

const TaskList = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [dueDateFilter, setDueDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const loadTasks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getTasks({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
        dueDate: dueDateFilter || undefined,
        page: page - 1,
        size: pageSize,
      });

      const tasksWithOwner = response.data.content.map((t) => ({
        ...t,
        isOwner: Number(t.assignedUserId) === Number(user.id),
      }));

      setTasks(tasksWithOwner);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(1);
  }, [statusFilter, priorityFilter, dueDateFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) loadTasks(page);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <TaskFilter
        status={statusFilter} setStatus={setStatusFilter}
        priority={priorityFilter} setPriority={setPriorityFilter}
        dueDate={dueDateFilter} setDueDate={setDueDateFilter}
      />

      {tasks.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Assigned User</th>
              <th>Status</th>
              {user.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={() => loadTasks(currentPage)}
                isAdmin={user.role === "ADMIN"}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noTasks}>No tasks found</p>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? styles.active : ""} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;