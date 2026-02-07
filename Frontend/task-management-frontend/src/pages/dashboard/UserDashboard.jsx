import TaskList from "../../components/task/TaskList";

const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <h2>My Tasks</h2>
      <TaskList />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
};

export default UserDashboard;