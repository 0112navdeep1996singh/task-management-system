import { updateTaskStatus } from "../../api/taskApi";

const TaskStatusDropdown = ({ taskId, currentStatus, onSuccess, disabled }) => {
  const handleChange = async (e) => {
    try {
      await updateTaskStatus(taskId, { status: e.target.value });
      onSuccess();
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating status");
    }
  };

  return (
    <select value={currentStatus} onChange={handleChange} disabled={disabled}>
      <option value="TODO">TODO</option>
      <option value="IN_PROGRESS">IN_PROGRESS</option>
      <option value="DONE">DONE</option> 
    </select>
  );
};

export default TaskStatusDropdown;