import TaskList from "../../components/task/TaskList";

const TasksPage = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>All Tasks</h2>
      <TaskList />
    </div>
  );
};

export default TasksPage;