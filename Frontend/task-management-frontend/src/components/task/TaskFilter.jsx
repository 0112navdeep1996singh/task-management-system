import styles from "../../css/TaskFilter.module.css";

const TaskFilter = ({ status, setStatus, priority, setPriority, dueDate, setDueDate }) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterHeading}>Filter Tasks</h3>

      <label className={styles.filterLabel}>
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="ALL">ALL</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </label>

      <label className={styles.filterLabel}>
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="ALL">ALL</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </label>

      <label className={styles.filterLabel}>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.filterInput}
        />
      </label>
    </div>
  );
};

export default TaskFilter;