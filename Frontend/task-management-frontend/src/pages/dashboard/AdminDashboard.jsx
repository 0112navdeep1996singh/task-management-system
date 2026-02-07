import { useState } from "react";
import TaskForm from "../../components/task/TaskForm";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <TaskForm />
    </div>
  );
};

const styles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "20px" },
};

export default AdminDashboard;